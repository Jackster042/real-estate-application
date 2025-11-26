import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getManager = async (
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

    const manager = await prisma.manager.findUnique({
      where: { cognitoId },
    });

    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ message: "Manager not found" });
    }
  } catch (error: any) {
    console.error("Error fetching manager info", error);
    res
      .status(500)
      .json({ message: `Error retrieving manager info: ${error.message}` });
  }
};

export const createManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;

    // TODO: INPUT VALIDATION ON BACKEND ??

    const manager = await prisma.manager.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });
    console.log(manager, "CREATED MANAGER");

    res.status(201).json(manager);
  } catch (error: any) {
    console.error("Error creating manager", error);
    res
      .status(500)
      .json({ message: `Error creating manager: ${error.message}` });
  }
};

export const updateManager = async (
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

    const { name, email, phoneNumber } = req.body;

    const updatedManager = await prisma.manager.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    console.log(updatedManager, "UPDATED MANAGER");

    res.json(updatedManager);
  } catch (error: any) {
    console.error("Error updating manager", error);
    res
      .status(500)
      .json({ message: `Error updating manager: ${error.message}` });
  }
};

export const getManagerProperties = async (
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
      where: { managerCognitoId: cognitoId },
      include: {
        location: true,
      },
    });

    const propertiesWIthFormattedLocation = await Promise.all(
      properties.map(async (property) => {
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
    res.status(200).json(propertiesWIthFormattedLocation);
  } catch (error: any) {
    console.error("Error fetching manager properties", error);
    res.status(500).json({ message: error.message });
  }
};
