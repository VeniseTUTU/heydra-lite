

import { illoSet } from '../index';

test("add 2 and 2 should equal 4", async () =>{
    const dd = await illoSet(2,2);
   expect(dd).toBe(4);
});
