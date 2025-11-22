import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: CHECK IF WE NEED TO AWAIT REQ.PARAMS
    const { cognitoId } = req.params;

    if (!cognitoId) {
      res
        .status(400)
        .json({ message: "Missing required parameter 'cognitoId'" });
      return;
    }

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
      },
    });

    if (!tenant) {
      res.status(404).json({ message: "Tenant not found" });
      return;
    } else {
      res.status(200).json(tenant);
    }
  } catch (error: any) {
    console.error("Error fetching tenant info", error);
    res
      .status(500)
      .json({ message: `Error retrieving tenant info: ${error.message}` });
  }
};

export const createTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });

    res.status(200).json(tenant);
  } catch (error: any) {
    console.error("Error creating tenant", error);
    res
      .status(500)
      .json({ message: `Error creating tenant: ${error.message}` });
  }
};

export const updateTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;

    if (!cognitoId) {
      res
        .status(400)
        .json({ message: "Missing required parameter 'cognitoId'" });
      return;
    }

    const updateTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.status(200).json(updateTenant);
  } catch (error: any) {
    console.error("Error updating tenant", error);

    res
      .status(500)
      .json({ message: `Error updating tenant: ${error.message}` });
  }
};

export const getCurrentResidences = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    if (!cognitoId) {
      res
        .status(400)
        .json({ message: "Missing required parameter 'cognitoId'" });
      return;
    }

    const properties = await prisma.property.findMany({
      where: { tenants: { some: { cognitoId } } },
      include: { location: true },
    });
    console.log(properties, "PROPERTY FROM CURRENT RESIDENCES CONTROLLER");

    const residencesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        // coordinates
        // longitude
        // latitude
        // geoJson

        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;
        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      })
    );

    res.status(200).json(residencesWithFormattedLocation);
  } catch (error: any) {
    console.error("Error getting current residences", error);
    res
      .status(500)
      .json({ message: `Error getting current residences: ${error.message}` });
  }
};

export const addFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    if (!cognitoId || !propertyId) {
      res.status(400).json({
        message: "Missing required parameter 'cognitoId' or 'propertyId'",
      });
      return;
    }

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: { favorites: true },
    });

    console.log(tenant, "TENANT FROM ADD FAVORITE CONTROLLER");
    if (!tenant) {
      res.status(404).json({ message: "Tenant not found" });
      return;
    }

    const propertyNumber = Number(propertyId);
    const existingFavorite = tenant.favorites || [];

    if (!existingFavorite.some((fav) => fav.id === propertyNumber)) {
      const updateTenant = await prisma.tenant.update({
        where: { cognitoId },
        data: {
          favorites: {
            connect: [{ id: propertyNumber }],
          },
        },
        include: { favorites: true },
      });

      res.json(updateTenant);
    } else {
      res
        .status(409)
        .json({ message: "Property is already a favorite for this tenant" });
    }
  } catch (error: any) {
    console.error("Error adding favorite property", error);
    res
      .status(500)
      .json({ message: `Error adding favorite property: ${error.message}` });
  }
};

export const removeFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    if (!cognitoId || !propertyId) {
      res.status(400).json({
        message: "Missing required parameter 'cognitoId' or 'propertyId'",
      });
      return;
    }

    const propertyNumber = Number(propertyId);
    const updateTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        favorites: {
          disconnect: { id: propertyNumber },
        },
      },
    });

    res.json(updateTenant);
  } catch (error: any) {
    console.error("Error removing property", error);
    res
      .status(500)
      .json({ message: `Error removing favorite property: ${error.message}` });
  }
};
