// ============================================================
// Exercise 5: Async JavaScript — Promises & Async/Await
// ============================================================

// ── Utility ──────────────────────────────────────────────────
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const timestamp = () => new Date().toISOString().split("T")[1].slice(0, 12);
const log = (msg) => console.log(`  [${timestamp()}] ${msg}`);

// ════════════════════════════════════════════════════════════
// 1. A promise that resolves after 2 seconds
// ════════════════════════════════════════════════════════════
const delayedGreeting = new Promise((resolve) => {
  log("⏳ delayedGreeting pending...");
  setTimeout(() => resolve("👋 Hello after 2 seconds!"), 2000);
});

// ════════════════════════════════════════════════════════════
// 2. Async function that awaits the promise
// ════════════════════════════════════════════════════════════
async function waitForGreeting() {
  log("🔄 Waiting for greeting...");
  const message = await delayedGreeting;
  log(`✅ Received: "${message}"`);
  return message;
}

// ════════════════════════════════════════════════════════════
// 3. Simulated API calls (user → posts → comments)
// ════════════════════════════════════════════════════════════

// Fake database
const DB = {
  users: {
    1: { id: 1, name: "Alice",   email: "alice@example.com",  role: "admin"  },
    2: { id: 2, name: "Bob",     email: "bob@example.com",    role: "editor" },
    3: { id: 3, name: "Charlie", email: "charlie@example.com",role: "viewer" },
  },
  posts: {
    1: [
      { id: 101, title: "Alice's first post",  likes: 42 },
      { id: 102, title: "Alice's second post", likes: 17 },
    ],
    2: [{ id: 201, title: "Bob's thoughts", likes: 8 }],
  },
  comments: {
    101: [
      { id: 1001, text: "Great post!",      author: "Bob"     },
      { id: 1002, text: "Very informative", author: "Charlie" },
    ],
    201: [{ id: 2001, text: "Interesting!", author: "Alice" }],
  },
};

/**
 * Simulate fetching a user by ID.
 * Rejects with a descriptive error if the user doesn't exist.
 */
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = DB.users[userId];
      user
        ? resolve(user)
        : reject(new Error(`User with ID ${userId} not found`));
    }, 600);
  });
}

/** Simulate fetching posts for a user. */
function fetchPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = DB.posts[userId];
      posts
        ? resolve(posts)
        : reject(new Error(`No posts found for user ID ${userId}`));
    }, 500);
  });
}

/** Simulate fetching comments for a post. */
function fetchComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comments = DB.comments[postId];
      comments
        ? resolve(comments)
        : reject(new Error(`No comments found for post ID ${postId}`));
    }, 400);
  });
}

// ════════════════════════════════════════════════════════════
// 4. Error handling with try / catch
// ════════════════════════════════════════════════════════════
async function getUserSafely(userId) {
  log(`🔍 Fetching user ID: ${userId}`);
  try {
    const user = await fetchUser(userId);
    log(`✅ Found user: ${user.name} (${user.role})`);
    return user;
  } catch (error) {
    log(`❌ Error: ${error.message}`);
    return null;
  }
}

// ════════════════════════════════════════════════════════════
// 5. Chain multiple async operations
// ════════════════════════════════════════════════════════════

/**
 * Sequential chain: user → posts → comments on the first post.
 * Each step depends on the result of the previous one.
 */
async function getUserProfile(userId) {
  log(`\n${"─".repeat(50)}`);
  log(`📦 Building profile for user ID: ${userId}`);

  try {
    // Step 1 — fetch user
    const user = await fetchUser(userId);
    log(`  👤 User: ${user.name} <${user.email}>`);

    // Step 2 — fetch their posts
    const posts = await fetchPosts(user.id);
    log(`  📝 Posts (${posts.length}):`);
    posts.forEach((p) => log(`       • [${p.id}] "${p.title}" — ${p.likes} likes`));

    // Step 3 — fetch comments on the first post
    const firstPost = posts[0];
    const comments = await fetchComments(firstPost.id);
    log(`  💬 Comments on "${firstPost.title}" (${comments.length}):`);
    comments.forEach((c) => log(`       • ${c.author}: "${c.text}"`));

    return { user, posts, comments };
  } catch (error) {
    log(`❌ Failed to build profile: ${error.message}`);
    return null;
  }
}

/**
 * Parallel fetch: load multiple users at the same time with Promise.all.
 * Total time ≈ slowest individual request (not sum of all).
 */
async function fetchMultipleUsers(ids) {
  log(`\n${"─".repeat(50)}`);
  log(`⚡ Fetching ${ids.length} users in parallel: [${ids.join(", ")}]`);

  try {
    const users = await Promise.all(ids.map((id) => fetchUser(id)));
    users.forEach((u) => log(`  ✅ ${u.name} (${u.email})`));
    return users;
  } catch (error) {
    log(`❌ Parallel fetch failed: ${error.message}`);
    return [];
  }
}

/**
 * Promise.allSettled: attempt fetches that may partially fail.
 * Unlike Promise.all, this never short-circuits on rejection.
 */
async function fetchWithPartialFailures(ids) {
  log(`\n${"─".repeat(50)}`);
  log(`🧪 allSettled fetch for IDs: [${ids.join(", ")}]`);

  const results = await Promise.allSettled(ids.map((id) => fetchUser(id)));
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      log(`  ✅ ID ${ids[i]}: ${result.value.name}`);
    } else {
      log(`  ❌ ID ${ids[i]}: ${result.reason.message}`);
    }
  });
}

/**
 * Promise.race: resolves/rejects with whichever settles first.
 * Useful for implementing timeouts.
 */
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`⏱ Timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

async function fetchWithTimeout(userId, ms) {
  log(`\n${"─".repeat(50)}`);
  log(`⏱ Fetching user ID ${userId} with ${ms}ms timeout`);
  try {
    const user = await withTimeout(fetchUser(userId), ms);
    log(`  ✅ Got: ${user.name}`);
  } catch (error) {
    log(`  ❌ ${error.message}`);
  }
}

// ════════════════════════════════════════════════════════════
// Run everything
// ════════════════════════════════════════════════════════════
async function main() {
  console.log("═".repeat(52));
  console.log("  ⚡  Async JavaScript — Full Demo");
  console.log("═".repeat(52));

  // 1 & 2 — delayed promise + async/await
  await waitForGreeting();

  // 3 & 4 — API simulation + error handling
  await getUserSafely(1);        // ✅ valid user
  await getUserSafely(99);       // ❌ triggers catch block

  // 5a — sequential async chain
  await getUserProfile(1);       // Alice: posts + comments
  await getUserProfile(3);       // Charlie: no posts → caught error

  // 5b — parallel with Promise.all
  await fetchMultipleUsers([1, 2, 3]);

  // 5c — Promise.allSettled (partial failures)
  await fetchWithPartialFailures([1, 2, 99]);

  // 5d — Promise.race / timeout
  await fetchWithTimeout(1, 1000);   // 600ms fetch < 1000ms → succeeds
  await fetchWithTimeout(1, 300);    // 600ms fetch > 300ms  → times out

  log(`\n✨ All async demos complete.`);
}

main();