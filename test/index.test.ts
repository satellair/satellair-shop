describe('1 + 1', () => {
  it('should equals 11', async () => {
    const onePlusOne = 1 + '1'
    expect(parseInt(onePlusOne)).toEqual(11);
  });
});