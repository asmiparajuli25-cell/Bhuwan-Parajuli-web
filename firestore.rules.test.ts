import * as fs from 'fs';
import { initializeTestEnvironment, assertFails, assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'test-project',
    firestore: {
      rules: fs.readFileSync('DRAFT_firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('Firestore Rules Test', () => {
  it('allows public read of posts', async () => {
    const unauth = testEnv.unauthenticatedContext();
    await assertSucceeds(getDoc(doc(unauth.firestore(), 'posts/test1')));
  });

  it('rejects create over 8 keys (Ghost Field)', async () => {
    const auth = testEnv.authenticatedContext('user1', { email_verified: true });
    await assertFails(setDoc(doc(auth.firestore(), 'posts/test1'), {
      id: 'test1', type: 'photo', createdAt: 1234, userId: 'user1',
      title: 't', text: 't', price: 'p', url: 'u', ghost: 'boo'
    }));
  });

  it('rejects spoofed userId', async () => {
    const auth = testEnv.authenticatedContext('user1', { email_verified: true });
    await assertFails(setDoc(doc(auth.firestore(), 'posts/test1'), {
      id: 'test1', type: 'photo', createdAt: 1234, userId: 'user2'
    }));
  });
});
