import { Request, Response } from "express";

import Core from "../Core.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { validationResult } from "express-validator";

class ShowcaseController {
  private core: Core;

  constructor(core: Core) {
    this.core = core;
  }

  public async getShowcases(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const showcases = await this.core.getPrisma().showcase.findMany({
      where: {
        buildTeam: req.query.slug
          ? { slug: req.params.id }
          : { id: req.params.id },
      },
      include: {
        image: true,
      },
    });
    res.send(showcases);
  }

  public async getAllShowcases(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const showcases = await this.core.getPrisma().showcase.findMany({
      include: {
        image: true,
        buildTeam: {
          select: {
            name: true,
            location: true,
            slug: true,
            icon: true,
            id: true,
          },
        },
      },
    });
    res.send(showcases);
  }

  public async getRandomShowcases(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const showcases = await this.core.getPrisma().showcase.findMany({
      include: {
        image: true,
        buildTeam: {
          select: {
            name: true,
            location: true,
            slug: true,
            icon: true,
            id: true,
          },
        },
      },
    });

    const randomIndexes = [];

    for (let i = 0; i < parseInt(req.query.limit as string); i++) {
      randomIndexes.push(Math.floor(Math.random() * showcases.length));
    }

    res.send(showcases.filter((s, index) => randomIndexes.includes(index)));
  }

  public async deleteShowcase(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const showcase = await this.core.getPrisma().showcase.findFirst({
      where: { id: req.params.id },
      include: {
        image: true,
      },
    });

    if (!showcase) {
      return res.status(404).send("Showcase not found");
    }

    const fileKey = showcase.image.name;

    const delUpload = this.core.getPrisma().upload.delete({
      where: { id: showcase.image.id },
    });
    const delShowcase = this.core.getPrisma().showcase.delete({
      where: { id: showcase.id },
    });

    const transaction = await this.core
      .getPrisma()
      .$transaction([delShowcase, delUpload]);

    const command = new DeleteObjectCommand({
      Bucket: this.core.getAWS().getS3Bucket(),
      Key: "upload/" + fileKey,
    });
    await this.core.getAWS().getS3Client().send(command);

    res.send(transaction);
  }

  public async createShowcase(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const upload = await this.core.getAWS().uploadFile(req.file);
    const showcase = await this.core.getPrisma().showcase.create({
      data: {
        title: req.body.title,
        image: { connect: { id: upload.id } },
        buildTeam: {
          connect: req.query.slug
            ? { slug: req.params.id }
            : { id: req.params.id },
        },
        createdAt: req.body.date,
      },
      select: { image: true },
    });

    res.send(showcase);
  }
}

export default ShowcaseController;
