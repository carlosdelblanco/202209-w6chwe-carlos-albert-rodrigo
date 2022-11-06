import type { Response } from "express";
import { endPointUnknown } from "./errors.js";

describe("Given a Uknown end point ", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a response", () => {
    test("Then it should call with the status 404", () => {
      const statusCode = 404;

      endPointUnknown(null, res as Response);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should received a call with the message: 'Error, Endpoint not found! ", () => {
      const expectedErrorMessage = {
        message: "Error, Endpoint not found!",
      };

      endPointUnknown(null, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
