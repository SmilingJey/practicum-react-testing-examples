 import { getResponse } from "../utils/utils";

const testObject = {
  ok: true,
  json: () => ({result: 'OK'})
}


 describe('check getResponse', () => {
    test('should be success', () => {
      const result = getResponse(testObject);
      expect(result).toEqual({ result: "OK" });
    })

    test('check be fail', () => {
      testObject.ok = false;
      testObject.status = 500;
      const result = getResponse(testObject);
      expect(result).rejects.toBe('Ошибка: 500');
    })
 })