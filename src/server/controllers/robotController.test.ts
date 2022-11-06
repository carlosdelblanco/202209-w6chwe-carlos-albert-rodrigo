import type { Response, NextFunction } from "express";
import Robot from "../../database/models/Robot";
import roboMock from "../../mocks/mocks";
import { getRobots } from "./robotsController";

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
