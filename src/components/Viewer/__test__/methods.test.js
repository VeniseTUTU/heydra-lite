
test("should extract ids from array", () =>{
    const array = [{itemId:2345,itemTitle:'def'},{itemId:12,itemTitle:'deb'}];
    const ids = array.map((ar) => (ar.itemId));
    const output = [2345,12];
    expect(ids).toEqual(output);
});

test("should separate array elements into words and make unique", () =>{
    const array = ['war,action','adventure','fiction','adventure'];
    const join = array.join(' ').replace(/,/g, ' ').split(' ');
    const unique = join.filter((x,i,a) => a.indexOf(x) == i)
    
    const output = ['war','action', 'adventure', 'fiction'];
    expect(unique).toEqual(output);
});

test("should return false", () =>{
    const dataField = false;
    const dataField2 = "false";
    const result = dataField === dataField2;
    
    const output = true;
    expect(result).toBe(true);
});
