export default {
  currentSession: jest.fn(),
  trackSession: jest.fn(),
  fetch: jest.fn((request, init) => ({ ok: !init || init.body !== 'error', status: 123, statusText: 'Status' })),
};
