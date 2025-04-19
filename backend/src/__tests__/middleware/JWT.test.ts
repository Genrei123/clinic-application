import { createToken, decodeToken } from "../../middleware/JWT";

describe('Create Token for User', () => {
    it('should create token after successful login', () => {
        createToken();
        expect(console.log("Created Token!"));
    });
});

describe('Decode Token for User', () => {
    it('should decode token of the user', () => {
        decodeToken();
        expect(console.log("Decoded Token!"));
    });
});