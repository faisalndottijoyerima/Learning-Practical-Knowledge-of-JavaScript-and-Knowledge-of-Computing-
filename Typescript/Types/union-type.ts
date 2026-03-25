type Status = 'success' | 'error' | 'loading';

type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
}

type UserEvent =
  | { type: 'userCreated'; payload: { userId: number; name: string } }
  | { type: 'userUpdated'; payload: { userId: number; changes: Partial<User> } }
  | { type: 'userDeleted'; payload: { userId: number; reason?: string } }
  | { type: 'userLoggedIn'; payload: { userId: number; timestamp: Date } };

// Type Guards
function isSuccess<T>(r: Result<T>): r is { success: true; data: T } {
  return r.success === true;
}

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

function handleResult<T>(result: Result<T>): void {
  if (isSuccess(result)) {
    console.log('✅ Success:', result.data);
  } else {
    console.error('❌ Error:', result.error);
  }
}

console.log('--- Example Usage ---');
const result1: Result<string> = { success: true, data: 'Hello, World!' };
const result2: Result<string> = { success: false, error: 'Something went wrong.' }; 

handleResult(result1);
handleResult(result2);