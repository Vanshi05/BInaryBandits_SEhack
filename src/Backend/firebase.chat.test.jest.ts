import { runChatTests } from '../test';

describe('Firebase Chat Integration', () => {
  jest.setTimeout(40000); // Extend timeout for Firebase operations

  it('should complete all chat operations', async () => {
    await runChatTests();
  });
});