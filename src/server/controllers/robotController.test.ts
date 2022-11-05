import type { Response } from "express";
import Robot from "../../database/models/Robot";
import roboMock from "../../mocks/mocks";
import { getRobots } from "./robotsController";

const res: Partial<Response> = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe("Given a getRobots controller", () => {
  describe("When it finds a list of robots", () => {
    test("Then it should call athe 200 response method status and a json method", async () => {
      const expectedStatus = 200;

      Robot.find = jest.fn().mockReturnValue(roboMock);

      await getRobots(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
