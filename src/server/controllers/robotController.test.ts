import type { Response, NextFunction, Request } from "express";
import Robot from "../../database/models/Robot";
import roboMock from "../../mocks/mocks";
import type RobotsFeatures from "../../types/types";
import { getRobotById, getRobots } from "./robotsController";

beforeEach(() => {
  jest.clearAllMocks();
});

const next = jest.fn();

const res: Partial<Response> = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe("Given a getRobots controller", () => {
  describe("When it finds a list of robots", () => {
    test("Then it should call the 200 response method status and a json method", async () => {
      const expectedStatus = 200;

      Robot.find = jest.fn().mockReturnValue(roboMock);

      await getRobots(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an empty array", () => {
    test("Then it should call the 404 response method", async () => {
      const expectedStatus = 404;

      Robot.find = jest.fn().mockReturnValue([]);

      await getRobots(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response with an error", () => {
    test("Then next should be called", async () => {
      Robot.find = jest.fn().mockRejectedValue(new Error(""));

      await getRobots(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a getRobotById", () => {
  describe("When it receives a id to find that robot", () => {
    test("Then it should show the robot with that status 200", async () => {
      const req = {
        params: "" as unknown,
      };

      const expectedStatus = 404;

      Robot.findById = jest.fn().mockRejectedValueOnce({ robot: roboMock });

      await getRobotById(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a Id and that's exist", () => {
    const robot: RobotsFeatures[] = [
      {
        _id: "63657d7fb90784fab899b923",
        name: "tutitos",
        image:
          "https://s3.amazonaws.com/podcasts-image-uploads/podcast-sobre-yo-robot-300x300.jpg",
        creation: "01-04-20",
        resistance: 6,
        speed: 8,
      },
    ];

    const req: Partial<Request> = {
      params: { idRobot: "63657d7fb90784fab899b923" },
    };

    test("Then the status method was called with code 200", async () => {
      Robot.findById = jest.fn().mockReturnValue(Robot);
      const expectedStatus = 200;

      await getRobotById(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then the json method was called with a robot", async () => {
      Robot.findById = jest.fn().mockReturnValue(robot[0]);

      await getRobotById(req as Request, res as Response, null);

      expect(res.json).toHaveBeenCalledWith({ robot: robot[0] });
    });
  });
});
