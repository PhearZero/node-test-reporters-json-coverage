
import {describe, it} from 'node:test';
import assert from 'node:assert';

describe('Description Block', ()=>{
  it('long test', async ()=>{
    await new Promise((resolve)=>{
      setTimeout(()=>{
        assert.strictEqual(2, 2);
        resolve();
      }, 1500);
    });
  });
  it('very long test', async ()=>{
    await new Promise((resolve)=>{
      setTimeout(()=>{
        assert.strictEqual(2, 2);
        resolve();
      }, 3000);
    });
  });
  it('should have something fancy', ()=>{
    assert.strictEqual(2, 2);
  });
  it.skip('should fail someway', ()=>{
    assert.strictEqual(3, 2);
  });
  describe('Nested Description', ()=>{
    it('three', ()=>{
      assert.strictEqual(2, 2);
    });
    it.skip('four', ()=>{
      assert.strictEqual(3, 2);
    });
  });
});
