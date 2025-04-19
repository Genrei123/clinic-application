import { createInventory, readInventory, updateInventory, deleteInventory } from "../../../controllers/inventory/inventoryController";
import { Response, Request } from 'express';

describe('Create Inventory Controller', () => {
    it('should add items into the database', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        createInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Reading Inventory Controller', () => {
    it('should give back the item/items from the databse', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        readInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Update Inventory Controller', () => {
    it('should update the item based on the ID and the object', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        updateInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Delete Inventory Controller ', () => {
    it('should delete the tiem based on the ID and the object', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        deleteInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});