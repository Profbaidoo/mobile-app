// ============================================================================ // Section: Security Module Header
// PROF~BAIDOO EDU SYSTEM — Comprehensive Security & Authentication Engine       // Module: System Title
// Features: Identification, 2FA, Row-Level Authorization, Salt+Pepper, Backup   // Module: Feature Summary
// ============================================================================ // Section: Header Divider
//                                                                              // Line: Blank comment line
// 1. APPLICATION CONSTANTS & PEPPER KEY                                        // Section: Configuration
const AUTH_PEPPER = "ProfBaidooEduComplex_Pepper_Key_2026_Secured!";            // Secret Pepper: Application-wide secret salt pepper
const AUTH_STORAGE_USERS = "PROF_BAIDOO_SMS_AUTH_USERS_V2";                     // Storage: User accounts database key
const AUTH_STORAGE_SESSION = "PROF_BAIDOO_SMS_AUTH_SESSION_V2";                 // Storage: Active user session key
const AUTH_STORAGE_LOGS = "PROF_BAIDOO_SMS_AUTH_SECURITY_LOGS_V2";              // Storage: Security audit trail logs key
//                                                                              // Line: Blank comment line
// 2. CRYPTOGRAPHIC PRIMITIVES & UTILITIES                                      // Section: Cryptography Core
// Fast SHA-256 implementation supporting Web Crypto API and fallback           // Description: SHA-256 helper
async function computeSha256(text) {                                            // Function: Computes SHA-256 hash
    const encoder = new TextEncoder();                                          // Encoder: Instantiate UTF-8 text encoder
    const data = encoder.encode(text);                                          // Data: Convert input string into uint8 bytes
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);             // Crypto: Compute cryptographic SHA-256 digest
    const hashArray = Array.from(new Uint8Array(hashBuffer));                   // Conversion: Convert buffer into standard byte array
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");        // Hex: Format bytes into 64-character hex string
}                                                                               // End: computeSha256 function
//                                                                              // Line: Blank comment line
// Synchronous SHA-256 helper for immediate seed checks & UI state calculation  // Description: Synchronous SHA-256 implementation
function syncSha256(ascii) {                                                    // Function: Pure JavaScript SHA-256 for sync flows
    function rightRotate(value, amount) {                                       // Helper: Right rotate 32-bit integer
        return (value >>> amount) | (value << (32 - amount));                   // Bitwise: Bit shift and bitwise OR
    }                                                                           // End: rightRotate helper
    const mathPow = Math.pow;                                                   // Alias: Math.pow function
    const maxWord = mathPow(2, 32);                                             // Constant: Maximum 32-bit word boundary
    let result = "";                                                            // Accumulator: Final hexadecimal digest string
    const words = [];                                                           // Array: 32-bit word buffer array
    const asciiBitLength = ascii.length * 8;                                    // Bits: Total length in bits
    let hash = [                                                                // State: Initial SHA-256 hash values
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,                         // State: First 4 words of SHA-256 initial constants
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19                          // State: Next 4 words of SHA-256 initial constants
    ];                                                                          // End: Initial state constants
    const k = [                                                                 // Round Constants: 64 SHA-256 round constant words
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, // Constants 00 to 07
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, // Constants 08 to 15
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, // Constants 16 to 23
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, // Constants 24 to 31
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, // Constants 32 to 39
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, // Constants 40 to 47
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, // Constants 48 to 55
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2  // Constants 56 to 63
    ];                                                                          // End: Round constants
    for (let i = 0; i < ascii.length; i++) {                                    // Loop: Iterate through each character in ascii string
        words[i >> 2] |= (ascii.charCodeAt(i) & 255) << (24 - (i % 4) * 8);     // Words: Pack 4 characters per 32-bit word
    }                                                                           // End: Character packing loop
    words[asciiBitLength >> 5] |= 0x80 << (24 - (asciiBitLength % 32));          // Padding: Append mandatory bit 1 (0x80)
    words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;            // Length: Append total message bit length
    for (let j = 0; j < words.length; j += 16) {                                // Block: Process input in 512-bit (16-word) blocks
        const w = [];                                                           // Array: 64-entry working schedule array
        for (let i = 0; i < 16; i++) w[i] = words[j + i] | 0;                   // Copy: Copy first 16 words from input block
        for (let i = 16; i < 64; i++) {                                         // Extend: Compute remaining 48 message words
            const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3); // s0: Sigma-0 schedule calculation
            const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);  // s1: Sigma-1 schedule calculation
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;                         // Addition: Word addition with 32-bit wrap
        }                                                                       // End: Message schedule extension
        let [a, b, c, d, e, f, g, h] = hash;                                    // Working Variables: Initialize working variables a-h
        for (let i = 0; i < 64; i++) {                                          // Rounds: Execute 64 cryptographic rounds
            const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25); // S1: Upper Sigma-1 on working variable e
            const ch = (e & f) ^ (~e & g);                                      // ch: Choice function on e, f, and g
            const temp1 = (h + S1 + ch + k[i] + w[i]) | 0;                      // temp1: Round temp calculation
            const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22); // S0: Upper Sigma-0 on working variable a
            const maj = (a & b) ^ (a & c) ^ (b & c);                            // maj: Majority function on a, b, and c
            const temp2 = (S0 + maj) | 0;                                       // temp2: Round temp calculation
            h = g; g = f; f = e; e = (d + temp1) | 0;                           // Shift: Shift working variables
            d = c; c = b; b = a; a = (temp1 + temp2) | 0;                       // Update: Update working variable a
        }                                                                       // End: 64 rounds loop
        hash[0] = (hash[0] + a) | 0; hash[1] = (hash[1] + b) | 0;               // Accumulate: Add round variables to running hash
        hash[2] = (hash[2] + c) | 0; hash[3] = (hash[3] + d) | 0;               // Accumulate: Add round variables to running hash
        hash[4] = (hash[4] + e) | 0; hash[5] = (hash[5] + f) | 0;               // Accumulate: Add round variables to running hash
        hash[6] = (hash[6] + g) | 0; hash[7] = (hash[7] + h) | 0;               // Accumulate: Add round variables to running hash
    }                                                                           // End: 512-bit blocks loop
    for (let i = 0; i < 8; i++) {                                               // Format: Format 8 32-bit hash integers
        for (let j = 3; j >= 0; j--) {                                          // Bytes: Extract each byte from 32-bit integer
            const byte = (hash[i] >> (8 * j)) & 255;                            // Byte: Bitshift to get individual byte value
            result += (byte < 16 ? "0" : "") + byte.toString(16);               // Hex: Append hex characters with zero padding
        }                                                                       // End: Byte extraction
    }                                                                           // End: Format loop
    return result;                                                              // Return: Complete 64-character SHA-256 hex string
}                                                                               // End: syncSha256 function
//                                                                              // Line: Blank comment line
// Cryptographically Secure Salt Generator                                      // Description: Salt generation function
function generateSalt(byteLength = 16) {                                        // Function: Generates random cryptographic salt
    const randomBytes = new Uint8Array(byteLength);                             // Array: Allocate typed array for random bytes
    window.crypto.getRandomValues(randomBytes);                                 // CSPRNG: Populate with cryptographically secure random values
    return Array.from(randomBytes).map(b => b.toString(16).padStart(2, "0")).join(""); // Format: Return lowercase hex string
}                                                                               // End: generateSalt function
//                                                                              // Line: Blank comment line
// Password Hashing with Salt AND Pepper                                        // Description: Salt + Pepper hashing function
function hashPasswordWithSaltAndPepper(password, salt, pepper = AUTH_PEPPER) {   // Function: Combines password with salt and pepper
    const combinedString = salt + "::" + password + "::" + pepper;              // Combine: Interleave salt, cleartext password, and secret pepper
    return syncSha256(combinedString);                                          // Digest: Return cryptographic SHA-256 digest
}                                                                               // End: hashPasswordWithSaltAndPepper function
//                                                                              // Line: Blank comment line
// 3. TWO-FACTOR AUTHENTICATION (TOTP / RFC 6238) IMPLEMENTATION                 // Section: 2FA TOTP Engine
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";                     // Base32: Standard RFC 4648 Base32 alphabet
//                                                                              // Line: Blank comment line
// Decode Base32 string to Uint8Array bytes                                     // Description: Base32 decoding helper
function base32ToBytes(base32String) {                                          // Function: Converts Base32 string into byte array
    const clean = base32String.toUpperCase().replace(/[^A-Z2-7]/g, "");         // Sanitize: Remove spaces, hyphens, and invalid characters
    let bits = "";                                                              // Accumulator: Binary bit string
    for (let i = 0; i < clean.length; i++) {                                    // Loop: Iterate each character
        const val = BASE32_ALPHABET.indexOf(clean[i]);                          // Lookup: Find index in Base32 alphabet
        if (val === -1) continue;                                               // Guard: Skip unmapped characters
        bits += val.toString(2).padStart(5, "0");                               // Bits: Append 5-bit binary representation
    }                                                                           // End: Loop
    const bytes = [];                                                           // Array: Target bytes buffer
    for (let i = 0; i + 8 <= bits.length; i += 8) {                             // Loop: Group bits into 8-bit bytes
        bytes.push(parseInt(bits.substr(i, 8), 2));                             // Convert: Parse binary byte into integer
    }                                                                           // End: Byte grouping
    return new Uint8Array(bytes);                                               // Return: Formatted typed array of bytes
}                                                                               // End: base32ToBytes function
//                                                                              // Line: Blank comment line
// Generate Base32 Secret Key for 2FA onboarding                                // Description: Random 2FA secret generator
function generateBase32Secret(length = 16) {                                    // Function: Produces high-entropy Base32 secret
    const randomBytes = new Uint8Array(length);                                 // Array: Typed array for random seed bytes
    window.crypto.getRandomValues(randomBytes);                                 // CSPRNG: Generate secure random bytes
    let secret = "";                                                            // Accumulator: Resulting Base32 secret string
    for (let i = 0; i < length; i++) {                                          // Loop: Map each random byte to alphabet
        secret += BASE32_ALPHABET[randomBytes[i] % BASE32_ALPHABET.length];     // Lookup: Modulo mapping to alphabet
    }                                                                           // End: Loop
    return secret;                                                              // Return: Base32 secret key
}                                                                               // End: generateBase32Secret function
//                                                                              // Line: Blank comment line
// Pure JavaScript HMAC-SHA1 for RFC 6238 TOTP computation                     // Description: Synchronous HMAC-SHA1 implementation
function hmacSha1(keyBytes, messageBytes) {                                     // Function: Computes HMAC-SHA1 digest
    function sha1(bytes) {                                                      // Helper: Pure SHA-1 hashing algorithm
        let words = [];                                                         // Words: 32-bit words buffer
        for (let i = 0; i < bytes.length; i++) {                                // Loop: Pack bytes into 32-bit words
            words[i >> 2] |= (bytes[i] & 255) << (24 - (i % 4) * 8);            // Shift: Pack into big-endian word
        }                                                                       // End: Packing loop
        const bitLen = bytes.length * 8;                                        // Bit Length: Original message bit length
        words[bitLen >> 5] |= 0x80 << (24 - (bitLen % 32));                     // Padding: Append 0x80 bit
        words[(((bitLen + 64) >> 9) << 4) + 15] = bitLen;                       // Length: Append 64-bit length word
        let [h0, h1, h2, h3, h4] = [                                            // State: Initial SHA-1 state constants
            0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0          // Constants: Standard SHA-1 initialization vectors
        ];                                                                      // End: Initial constants
        const rotl = (n, s) => (n << s) | (n >>> (32 - s));                     // Helper: 32-bit circular rotate left
        for (let i = 0; i < words.length; i += 16) {                            // Loop: Process 512-bit message blocks
            const w = new Array(80);                                            // Schedule: 80-word expanded message schedule
            for (let t = 0; t < 16; t++) w[t] = words[i + t] | 0;               // Schedule: Copy initial 16 words
            for (let t = 16; t < 80; t++) w[t] = rotl(w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16], 1); // Expand: Compute words 16-79
            let [a, b, c, d, e] = [h0, h1, h2, h3, h4];                         // Working: Copy running state to registers
            for (let t = 0; t < 80; t++) {                                      // Rounds: Execute 80 compression rounds
                let f, k;                                                       // Variables: Function result and round constant
                if (t < 20) { f = (b & c) | (~b & d); k = 0x5a827999; }         // Round 00-19: Choice function
                else if (t < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }             // Round 20-39: Parity function
                else if (t < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; } // Round 40-59: Majority function
                else { f = b ^ c ^ d; k = 0xca62c1d6; }                         // Round 60-79: Parity function
                const temp = (rotl(a, 5) + f + e + k + w[t]) | 0;               // Temp: Round step accumulation
                e = d; d = c; c = rotl(b, 30); b = a; a = temp;                 // Shift: Rotate and update registers
            }                                                                   // End: 80 rounds loop
            h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0;           // Update: Add registers to running hash state
            h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;                               // Update: Add registers to running hash state
        }                                                                       // End: 512-bit blocks loop
        const out = [];                                                         // Output: Target byte array for 20-byte digest
        [h0, h1, h2, h3, h4].forEach(word => {                                  // Iterate: Unpack each 32-bit word into bytes
            out.push((word >>> 24) & 255, (word >>> 16) & 255, (word >>> 8) & 255, word & 255); // Unpack: Extract 4 bytes
        });                                                                     // End: Unpack iteration
        return new Uint8Array(out);                                             // Return: 20-byte SHA-1 digest array
    }                                                                           // End: sha1 helper
    let key = keyBytes;                                                         // Key: Active key bytes
    if (key.length > 64) key = sha1(key);                                       // Key: Keys longer than block size are hashed
    const paddedKey = new Uint8Array(64);                                       // Buffer: 64-byte block padded key buffer
    paddedKey.set(key);                                                         // Copy: Set key into padded buffer
    const oKeyPad = new Uint8Array(64);                                         // Buffer: Outer key pad buffer
    const iKeyPad = new Uint8Array(64);                                         // Buffer: Inner key pad buffer
    for (let i = 0; i < 64; i++) {                                              // Loop: Compute XOR masks for key pads
        oKeyPad[i] = paddedKey[i] ^ 0x5c;                                       // XOR: Outer padding with 0x5c
        iKeyPad[i] = paddedKey[i] ^ 0x36;                                       // XOR: Inner padding with 0x36
    }                                                                           // End: Padding loop
    const innerCombined = new Uint8Array(64 + messageBytes.length);             // Buffer: Combined inner pad and message
    innerCombined.set(iKeyPad, 0);                                              // Set: Inner pad at start
    innerCombined.set(messageBytes, 64);                                        // Set: Message bytes after pad
    const innerHash = sha1(innerCombined);                                      // Hash: Compute inner SHA-1 digest
    const outerCombined = new Uint8Array(64 + innerHash.length);                // Buffer: Combined outer pad and inner hash
    outerCombined.set(oKeyPad, 0);                                              // Set: Outer pad at start
    outerCombined.set(innerHash, 64);                                           // Set: Inner hash after pad
    return sha1(outerCombined);                                                 // Hash: Return outer SHA-1 digest (HMAC result)
}                                                                               // End: hmacSha1 function
//                                                                              // Line: Blank comment line
// Generate RFC 6238 6-Digit TOTP Token                                         // Description: TOTP code generation function
function generateTOTPCode(secretBase32, timeStepOffset = 0) {                   // Function: Generates current 6-digit TOTP code
    const keyBytes = base32ToBytes(secretBase32);                               // Decode: Parse Base32 secret into bytes
    const epochSeconds = Math.floor(Date.now() / 1000);                         // Time: Current unix timestamp in seconds
    const counter = Math.floor(epochSeconds / 30) + timeStepOffset;             // Counter: 30-second time window counter
    const counterBytes = new Uint8Array(8);                                     // Buffer: 8-byte big-endian counter buffer
    let temp = counter;                                                         // Temp: Numeric counter copy
    for (let i = 7; i >= 0; i--) {                                              // Loop: Pack 64-bit integer into big-endian bytes
        counterBytes[i] = temp & 255;                                           // Byte: Extract lowest 8 bits
        temp = Math.floor(temp / 256);                                          // Shift: Shift right by 8 bits
    }                                                                           // End: Big-endian packing loop
    const hmac = hmacSha1(keyBytes, counterBytes);                              // HMAC: Compute HMAC-SHA1 of counter bytes
    const offset = hmac[hmac.length - 1] & 0x0f;                                // Offset: Extract lower 4 bits of last byte
    const binary =                                                              // Binary: Extract dynamic 31-bit code integer
        ((hmac[offset] & 0x7f) << 24) |                                         // Mask: Most significant byte (mask bit 31)
        ((hmac[offset + 1] & 0xff) << 16) |                                     // Shift: Second byte
        ((hmac[offset + 2] & 0xff) << 8) |                                      // Shift: Third byte
        (hmac[offset + 3] & 0xff);                                              // Mask: Least significant byte
    const otp = binary % 1000000;                                               // Modulo: Constrain to 6 decimal digits
    return otp.toString().padStart(6, "0");                                     // Format: Pad with leading zeros to 6 digits
}                                                                               // End: generateTOTPCode function
//                                                                              // Line: Blank comment line
// Verify TOTP Code with Time Drift Window Tolerance (Current, -1, +1)          // Description: 2FA validation function
function verifyTOTPCode(enteredCode, secretBase32) {                            // Function: Validates entered 6-digit 2FA token
    const cleanedCode = (enteredCode || "").toString().trim();                  // Clean: Trim and convert input to string
    if (cleanedCode.length !== 6) return false;                                 // Guard: Code must be exactly 6 characters
    for (let offset of [0, -1, 1]) {                                            // Drift: Check current step, previous, and next
        const expected = generateTOTPCode(secretBase32, offset);                // Generate: Compute expected code for time step
        if (expected === cleanedCode) {                                         // Compare: Check if user code matches expected code
            return true;                                                        // Match: Code is valid and within tolerance
        }                                                                       // End: Match check
    }                                                                           // End: Drift window loop
    return false;                                                               // Fail: Code did not match any accepted window
}                                                                               // End: verifyTOTPCode function
if (typeof window !== "undefined") {
    window.generateTOTPCode = generateTOTPCode;
    window.verifyTOTPCode = verifyTOTPCode;
}
//                                                                              // Line: Blank comment line
// 4. AUTH BACKUP (EMERGENCY RECOVERY & BACKUP CODES ENGINE)                    // Section: Auth Backup Codes Engine
// Generates a set of single-use backup recovery codes                          // Description: Emergency backup codes generator
function generateEmergencyBackupCodes(count = 8) {                              // Function: Generates 8 single-use auth backup codes
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";                      // Alphabet: High-readability alphanumeric characters
    const codes = [];                                                           // Array: Target backup codes array
    for (let i = 0; i < count; i++) {                                           // Loop: Generate requested number of backup codes
        let code = "";                                                          // Code: String accumulator
        const randomVals = new Uint8Array(8);                                   // Random: Allocate 8 random bytes
        window.crypto.getRandomValues(randomVals);                              // CSPRNG: Fill with cryptographic random numbers
        for (let j = 0; j < 8; j++) {                                           // Loop: Pick 8 characters
            if (j === 4) code += "-";                                           // Hyphen: Insert readable delimiter in middle
            code += characters[randomVals[j] % characters.length];               // Char: Map random byte to character
        }                                                                       // End: Character loop
        codes.push({                                                            // Record: Build backup code descriptor object
            code: code,                                                         // Plaintext: Display code (e.g. 8F4D-29A1)
            used: false,                                                        // Status: Unused single-use flag
            usedAt: null                                                        // Timestamp: Null until redeemed
        });                                                                     // End: Push descriptor
    }                                                                           // End: Backup codes loop
    return codes;                                                               // Return: Array of generated auth backup codes
}                                                                               // End: generateEmergencyBackupCodes function
//                                                                              // Line: Blank comment line
// Verify and Redeem Single-Use Auth Backup Code                                // Description: Auth backup redemption
function redeemAuthBackupCode(user, enteredCode) {                              // Function: Validates and burns an emergency backup code
    if (!user || !user.backupCodes || !Array.isArray(user.backupCodes)) {       // Guard: Verify user has backup codes configured
        return { success: false, reason: "No auth backup codes found on this profile." }; // Return: Failure descriptor
    }                                                                           // End: Guard
    const formatted = enteredCode.toUpperCase().trim();                         // Format: Normalize input code to uppercase
    const matchIndex = user.backupCodes.findIndex(b => b.code.toUpperCase() === formatted); // Find: Locate matching backup code index
    if (matchIndex === -1) {                                                    // Check: If code does not exist in user profile
        return { success: false, reason: "Invalid emergency auth backup code." }; // Return: Failure descriptor
    }                                                                           // End: Check
    const targetCode = user.backupCodes[matchIndex];                            // Target: Reference matched backup code
    if (targetCode.used) {                                                      // Check: Ensure code has not already been used
        return { success: false, reason: "This backup code was already redeemed on " + (targetCode.usedAt || "earlier date") + "." }; // Return: Used error
    }                                                                           // End: Check
    targetCode.used = true;                                                     // Burn: Mark code as consumed permanently
    targetCode.usedAt = new Date().toLocaleString();                            // Timestamp: Record exact timestamp of redemption
    const remainingCount = user.backupCodes.filter(b => !b.used).length;        // Count: Calculate remaining unused codes
    SMSAuth.saveUser(user);                                                     // Persist: Save updated user record to storage
    SMSAuth.logSecurityEvent("AUTH_BACKUP_CODE_USED",                           // Audit: Log auth backup code usage
        "User " + user.username + " logged in via emergency Auth Backup Code (" + targetCode.code + "). " + remainingCount + " backup codes remaining."); // Audit message
    return { success: true, redeemedCode: targetCode.code, remainingCount };
}
//
// 5. SEED USER IDENTITIES WITH PRECOMPUTED SALT & PEPPER HASHES & MOBILE PHONES // Section: Pre-seeded User Database
const DEFAULT_AUTH_USERS = [                                                    // Array: Seed user database records
    {                                                                           // User 1: Super Administrator
        id: "usr_admin_01",                                                     // Identification: Unique user ID
        username: "admin",                                                      // Identification: Username for login
        email: "admin@profbaidooeducomplexacademy.edu",                         // Identification: Email address
        phone: "+233 24 412 3456",                                              // Mobile Phone: Primary 2FA mobile phone number
        fullName: "Prof. Nathaniel Esoun Baidoo",                               // Profile: Full human display name
        role: "SuperAdmin",                                                     // Role: Highest privilege role
        roleTitle: "Head Administrator & Principal",                            // Display: Human-readable role title
        avatarBg: "linear-gradient(135deg, #6366f1, #a855f7)",                  // Visual: Avatar gradient
        avatarText: "PA",                                                       // Visual: Avatar initials
        salt: "dad1072a5a97e74d851bc82fe4562438",                               // Cryptography: Unique 128-bit cryptographic salt
        passwordHash: "6f3a322f8c268c805d38aedaa716cf309b343cab5c5ccada781df56da489b888", // Hash: SHA256(salt + "Admin@2026!" + PEPPER)
        twoFactorSecret: "JBSWY3DPEHPK3PXP",                                    // 2FA: Base32 secret for Google Authenticator / TOTP
        twoFactorEnabled: true,                                                 // 2FA: Two-factor authentication required
        backupCodes: [                                                          // Auth Backup: 8 single-use recovery codes
            { code: "XRUX-RH59", used: false, usedAt: null },                   // Code 1: Emergency backup code
            { code: "77BS-Z89Y", used: false, usedAt: null },                   // Code 2: Emergency backup code
            { code: "9ZMC-T6X2", used: false, usedAt: null },                   // Code 3: Emergency backup code
            { code: "GFJ7-39PN", used: false, usedAt: null },                   // Code 4: Emergency backup code
            { code: "DV2Q-JQFN", used: false, usedAt: null },                   // Code 5: Emergency backup code
            { code: "GJ89-HH4E", used: false, usedAt: null },                   // Code 6: Emergency backup code
            { code: "UMKP-WHFR", used: false, usedAt: null },                   // Code 7: Emergency backup code
            { code: "P9KW-82TM", used: false, usedAt: null }                    // Code 8: Emergency backup code
        ],                                                                      // End: Backup codes
        rowScope: {                                                             // Row Authorization: Scope descriptor
            scopeType: "ALL_ROWS",                                              // Scope Type: All rows allowed
            assignedClass: "*",                                                 // Class: Unrestricted wildcard
            canMutateAll: true,                                                 // Mutation: Full add/edit/delete across all rows
            description: "Authorized for ALL rows across all classes and tables" // Human summary: Scope description
        }                                                                       // End: rowScope
    },                                                                          // End User 1
    {                                                                           // User 2: Primary 1 Teacher
        id: "usr_teacher_p1",                                                   // Identification: Unique user ID
        username: "teacher.grace",                                              // Identification: Username for login
        email: "grace.osei@profbaidooeducomplex.edu",                           // Identification: Email address
        phone: "+233 50 882 1923",                                              // Mobile Phone: Primary 2FA mobile phone number
        fullName: "Madam Grace Osei",                                           // Profile: Full human display name
        role: "Teacher",                                                        // Role: Educator role
        roleTitle: "Primary 1 Class Teacher",                                   // Display: Human-readable role title
        avatarBg: "linear-gradient(135deg, #10b981, #059669)",                  // Visual: Avatar gradient
        avatarText: "GO",                                                       // Visual: Avatar initials
        salt: "ca2f6ba7cda7fb56df1147f4e3bd507b",                               // Cryptography: Unique 128-bit cryptographic salt
        passwordHash: "be356fcfcc1fd30689cc7bc2c2f0e31869d7fd16d19dd76e13f0ef442e41ac34", // Hash: SHA256(salt + "Grace@2026!" + PEPPER)
        twoFactorSecret: "KREWY3DPEHPK3PXA",                                    // 2FA: Base32 secret for Google Authenticator / TOTP
        twoFactorEnabled: true,                                                 // 2FA: Two-factor authentication required
        backupCodes: [                                                          // Auth Backup: 8 single-use recovery codes
            { code: "BHJ9-ZGAN", used: false, usedAt: null },                   // Code 1: Emergency backup code
            { code: "LJ3T-2PHK", used: false, usedAt: null },                   // Code 2: Emergency backup code
            { code: "TSZP-QPM6", used: false, usedAt: null },                   // Code 3: Emergency backup code
            { code: "8J3N-T86F", used: false, usedAt: null },                   // Code 4: Emergency backup code
            { code: "QUS4-QMG2", used: false, usedAt: null },                   // Code 5: Emergency backup code
            { code: "3ER4-9HBY", used: false, usedAt: null },                   // Code 6: Emergency backup code
            { code: "W37T-RCAM", used: false, usedAt: null },                   // Code 7: Emergency backup code
            { code: "CAGP-VGWY", used: false, usedAt: null }                    // Code 8: Emergency backup code
        ],                                                                      // End: Backup codes
        rowScope: {                                                             // Row Authorization: Scope descriptor
            scopeType: "CLASS_ROWS_ONLY",                                       // Scope Type: Only rows matching assigned class
            assignedClass: "Primary 1",                                         // Class: Bound to Primary 1 class rows
            canMutateAll: false,                                                // Mutation: Cannot mutate outside assigned class
            description: "Authorized ONLY for Primary 1 student & academic rows" // Human summary: Scope description
        }                                                                       // End: rowScope
    },                                                                          // End User 2
    {                                                                           // User 3: Primary 2 Teacher
        id: "usr_teacher_p2",                                                   // Identification: Unique user ID
        username: "teacher.ebenezer",                                           // Identification: Username for login
        email: "e.mensah@profbaidooeducomplex.edu",                             // Identification: Email address
        phone: "+233 20 771 9044",                                              // Mobile Phone: Primary 2FA mobile phone number
        fullName: "Mr. Ebenezer Mensah",                                        // Profile: Full human display name
        role: "Teacher",                                                        // Role: Educator role
        roleTitle: "Primary 2 Class Teacher",                                   // Display: Human-readable role title
        avatarBg: "linear-gradient(135deg, #06b6d4, #3b82f6)",                  // Visual: Avatar gradient
        avatarText: "EM",                                                       // Visual: Avatar initials
        salt: "e40a1e1343794ba75bebffef2e232e54",                               // Cryptography: Unique 128-bit cryptographic salt
        passwordHash: "a9856d8509b6e3c5cc7be799bb04bb9a8bb117be11c50a3d50e88298fd63ae2a", // Hash: SHA256(salt + "Ebenezer@2026!" + PEPPER)
        twoFactorSecret: "LZEWY3DPEHPK3PXB",                                    // 2FA: Base32 secret for Google Authenticator / TOTP
        twoFactorEnabled: true,                                                 // 2FA: Two-factor authentication required
        backupCodes: [                                                          // Auth Backup: 8 single-use recovery codes
            { code: "PY6J-MFBK", used: false, usedAt: null },                   // Code 1: Emergency backup code
            { code: "ZLE9-KNSV", used: false, usedAt: null },                   // Code 2: Emergency backup code
            { code: "WDAB-BRCF", used: false, usedAt: null },                   // Code 3: Emergency backup code
            { code: "8NXG-DR8U", used: false, usedAt: null },                   // Code 4: Emergency backup code
            { code: "75U6-BAV7", used: false, usedAt: null },                   // Code 5: Emergency backup code
            { code: "M9MG-6ZCY", used: false, usedAt: null },                   // Code 6: Emergency backup code
            { code: "GJNH-CSV8", used: false, usedAt: null },                   // Code 7: Emergency backup code
            { code: "9REL-Y8R2", used: false, usedAt: null }                    // Code 8: Emergency backup code
        ],                                                                      // End: Backup codes
        rowScope: {                                                             // Row Authorization: Scope descriptor
            scopeType: "CLASS_ROWS_ONLY",                                       // Scope Type: Only rows matching assigned class
            assignedClass: "Primary 2",                                         // Class: Bound to Primary 2 class rows
            canMutateAll: false,                                                // Mutation: Cannot mutate outside assigned class
            description: "Authorized ONLY for Primary 2 student & academic rows" // Human summary: Scope description
        }                                                                       // End: rowScope
    },                                                                          // End User 3
    {                                                                           // User 4: Bursar / Finance Accountant
        id: "usr_bursar_01",                                                    // Identification: Unique user ID
        username: "bursar",                                                     // Identification: Username for login
        email: "finance@profbaidooeducomplexacademy.edu",                       // Identification: Email address
        phone: "+233 24 332 5501",                                              // Mobile Phone: Primary 2FA mobile phone number
        fullName: "Mr. Kwabena Boateng",                                        // Profile: Full human display name
        role: "Accountant",                                                     // Role: Finance & billing manager
        roleTitle: "Bursar & Accounts Head",                                    // Display: Human-readable role title
        avatarBg: "linear-gradient(135deg, #f59e0b, #d97706)",                  // Visual: Avatar gradient
        avatarText: "KB",                                                       // Visual: Avatar initials
        salt: "d6d07d0017961af2aaf1dab1a279c5af",                               // Cryptography: Unique 128-bit cryptographic salt
        passwordHash: "5fadf2f57b38c54cd5fc0d9f8c1c5d8c726846deee19e684bc4bc9c25abfecb6", // Hash: SHA256(salt + "Bursar@2026!" + PEPPER)
        twoFactorSecret: "MFEWY3DPEHPK3PXC",                                    // 2FA: Base32 secret for Google Authenticator / TOTP
        twoFactorEnabled: true,                                                 // 2FA: Two-factor authentication required
        backupCodes: [                                                          // Auth Backup: 8 single-use recovery codes
            { code: "Z3FL-GWAP", used: false, usedAt: null },                   // Code 1: Emergency backup code
            { code: "MNAW-Z2AN", used: false, usedAt: null },                   // Code 2: Emergency backup code
            { code: "HJ6E-WYC9", used: false, usedAt: null },                   // Code 3: Emergency backup code
            { code: "RZYP-L86M", used: false, usedAt: null },                   // Code 4: Emergency backup code
            { code: "HLC6-JMFX", used: false, usedAt: null },                   // Code 5: Emergency backup code
            { code: "BBBW-CLR6", used: false, usedAt: null },                   // Code 6: Emergency backup code
            { code: "U6YL-YERY", used: false, usedAt: null },                   // Code 7: Emergency backup code
            { code: "PHQP-C7CA", used: false, usedAt: null }                    // Code 8: Emergency backup code
        ],                                                                      // End: Backup codes
        rowScope: {                                                             // Row Authorization: Scope descriptor
            scopeType: "FEES_ROWS_ONLY",                                        // Scope Type: Fee & billing rows authority
            assignedClass: "*",                                                 // Class: Can view fees across classes
            canMutateAll: false,                                                // Mutation: Restricted to financial records
            description: "Authorized for fee rows; academic records are read-only" // Human summary: Scope description
        }                                                                       // End: rowScope
    },                                                                          // End User 4
    {                                                                           // User 5: Student / Parent Identity
        id: "usr_student_01",                                                   // Identification: Unique user ID
        username: "std.kwame",                                                  // Identification: Username for login
        email: "kwame.mensah@student.profbaidooedu.edu",                        // Identification: Email address
        phone: "+233 55 910 8832",                                              // Mobile Phone: Primary 2FA mobile phone number
        fullName: "Kwame Mensah",                                               // Profile: Full student name
        role: "Student",                                                        // Role: Student/Parent role
        roleTitle: "Basic 1 Pupil (PBE-2026-001)",                              // Display: Human-readable role title
        avatarBg: "linear-gradient(135deg, #ec4899, #8b5cf6)",                  // Visual: Avatar gradient
        avatarText: "KM",                                                       // Visual: Avatar initials
        salt: "645a6099ff5ed67889e1c935e9fe4be7",                               // Cryptography: Unique 128-bit cryptographic salt
        passwordHash: "687e58fafb8c4a9bbcf4a83b70bb5311045bfc419ab16188cbba8eb804e37403", // Hash: SHA256(salt + "Student@2026!" + PEPPER)
        twoFactorSecret: "NGEWY3DPEHPK3PXD",                                    // 2FA: Base32 secret for Google Authenticator / TOTP
        twoFactorEnabled: true,                                                 // 2FA: Two-factor authentication required
        backupCodes: [                                                          // Auth Backup: 8 single-use recovery codes
            { code: "NF6L-GPWH", used: false, usedAt: null },                   // Code 1: Emergency backup code
            { code: "EJC2-J68L", used: false, usedAt: null },                   // Code 2: Emergency backup code
            { code: "KJ3L-JQTG", used: false, usedAt: null },                   // Code 3: Emergency backup code
            { code: "6B5R-E4UE", used: false, usedAt: null },                   // Code 4: Emergency backup code
            { code: "6PFD-68PG", used: false, usedAt: null },                   // Code 5: Emergency backup code
            { code: "FJ47-PE5G", used: false, usedAt: null },                   // Code 6: Emergency backup code
            { code: "GNT4-JREF", used: false, usedAt: null },                   // Code 7: Emergency backup code
            { code: "YSHC-4XQT", used: false, usedAt: null }                    // Code 8: Emergency backup code
        ],                                                                      // End: Backup codes
        rowScope: {                                                             // Row Authorization: Scope descriptor
            scopeType: "OWN_ROW_ONLY",                                          // Scope Type: Strictly own row only
            studentId: "std-001",                                               // Filter: Primary key id std-001
            admissionNo: "PBE-2026-001",                                        // Filter: Admission number PBE-2026-001
            assignedClass: "Primary 1",                                         // Class: Primary 1
            canMutateAll: false,                                                // Mutation: Read-only on own row
            description: "Authorized ONLY to view Kwame Mensah personal row"    // Human summary: Scope description
        }                                                                       // End: rowScope
    }                                                                           // End User 5
];                                                                              // End: DEFAULT_AUTH_USERS

// 6. MAIN AUTHENTICATION & ROW AUTHORIZATION ENGINE                            // Section: SMSAuth Class
class SMSAuthManager {                                                          // Class: Authentication & Row Authorization Engine
    constructor() {                                                             // Constructor: Initializes the manager
        this.users = this.loadUsers();                                          // State: Load all user accounts
        this.currentSession = this.loadSession();                               // State: Load active user session
        this.pending2FAUser = null;                                             // State: Temporary staging for user awaiting 2FA
        this.totpTickerInterval = null;                                         // Timer: Interval handle for 30s TOTP countdown
        this.activeAuthTab = "signin";                                          // State: Active top tab ("signin" or "signup")
        this.active2FAMode = "qr";                                              // State: Active 2FA mode ("qr", "simulator", "sms")
        this.qrCodeInstance = null;                                             // Library: Active QRCode object instance
        this.qrTargetType = (typeof window !== "undefined" && window.location && window.location.protocol && window.location.protocol.startsWith("http")) ? "web" : "totp"; // Mode: 'web' (phone camera link) or 'totp' (authenticator app)
        this.lastSMSCode = null;                                                // State: Cache for simulated SMS token
    }                                                                           // End: constructor

    loadUsers() {                                                               // Method: Retrieves user accounts from localStorage
        try {                                                                   // Try: Read and parse JSON from storage
            const raw = localStorage.getItem(AUTH_STORAGE_USERS);               // Storage: Read raw string from key
            if (raw) {
                const list = JSON.parse(raw);
                // Ensure every user record has a mobile phone defined
                list.forEach(u => {
                    if (!u.phone) {
                        if (u.username === "admin") u.phone = "+233 24 412 3456";
                        else if (u.username === "teacher.grace") u.phone = "+233 50 882 1923";
                        else if (u.username === "teacher.ebenezer") u.phone = "+233 20 771 9044";
                        else if (u.username === "bursar") u.phone = "+233 24 332 5501";
                        else if (u.username === "std.kwame") u.phone = "+233 55 910 8832";
                        else u.phone = "+233 24 000 0000";
                    }
                });
                return list;
            }
        } catch (e) {                                                           // Catch: Handle storage error
            console.warn("Failed to parse users database, loading default", e); // Warn: Log failure
        }                                                                       // End: Try/catch
        this.saveUsers(DEFAULT_AUTH_USERS);                                     // Fallback: Persist default seeds if empty
        return JSON.parse(JSON.stringify(DEFAULT_AUTH_USERS));                  // Return: Fresh deep clone of seed users
    }                                                                           // End: loadUsers

    saveUsers(users) {                                                          // Method: Persists users array to storage
        this.users = users;                                                     // Update: Update in-memory user list
        localStorage.setItem(AUTH_STORAGE_USERS, JSON.stringify(users));        // Storage: Write serialized JSON string
    }                                                                           // End: saveUsers

    saveUser(updatedUser) {                                                     // Method: Updates a single user record
        const index = this.users.findIndex(u => u.id === updatedUser.id);       // Index: Find target user in user list
        if (index !== -1) {                                                     // Check: If user exists in storage
            this.users[index] = updatedUser;                                    // Replace: Replace with updated record
            this.saveUsers(this.users);                                         // Save: Persist updated array
            if (this.currentSession && this.currentSession.id === updatedUser.id) { // Session Check: If current active session is this user
                this.currentSession = updatedUser;                              // Update Session: Synchronize active session user
                this.saveSession(updatedUser);                                  // Persist Session: Save updated active session
            }                                                                   // End: Session check
        }                                                                       // End: Check
    }                                                                           // End: saveUser

    loadSession() {                                                             // Method: Retrieves active user session
        try {                                                                   // Try: Read active session JSON
            const raw = localStorage.getItem(AUTH_STORAGE_SESSION);             // Storage: Read active session string
            if (raw) return JSON.parse(raw);                                    // Parse: Return parsed session user
        } catch (e) {                                                           // Catch: Handle error
            console.warn("Failed to parse active session", e);                  // Warn: Log warning
        }                                                                       // End: Try/catch
        return null;                                                            // Return: Null if no user logged in
    }                                                                           // End: loadSession

    saveSession(user) {                                                         // Method: Saves active session to storage
        this.currentSession = user;                                             // State: Set in-memory session user
        if (user) {                                                             // Check: If user is logged in
            localStorage.setItem(AUTH_STORAGE_SESSION, JSON.stringify(user));   // Storage: Write session user object
        } else {                                                                // Else: User logged out
            localStorage.removeItem(AUTH_STORAGE_SESSION);                      // Storage: Remove session key
        }                                                                       // End: Check
    }                                                                           // End: saveSession

    getUserByIdentifier(identifier) {                                           // Method: User Identification lookup
        if (!identifier) return null;                                           // Guard: Null check on input identifier
        const clean = identifier.trim().toLowerCase();                          // Normalize: Trim and lowercase for comparison
        return this.users.find(u =>                                             // Search: Find matching user record
            u.username.toLowerCase() === clean ||                               // Match: Compare with username
            u.email.toLowerCase() === clean                                     // Match: Compare with email address
        ) || null;                                                              // Return: Matched user or null
    }                                                                           // End: getUserByIdentifier

    logSecurityEvent(eventType, message) {                                      // Method: Records security audit log entry
        try {                                                                   // Try: Read existing logs
            const raw = localStorage.getItem(AUTH_STORAGE_LOGS);                // Storage: Read logs string
            const logs = raw ? JSON.parse(raw) : [];                            // Parse: Parse or initialize empty array
            logs.unshift({                                                      // Unshift: Add new log event to start
                id: "sec_" + Date.now() + "_" + Math.floor(Math.random() * 1000), // ID: Unique log entry ID
                type: eventType,                                                // Type: Categorical event type
                message: message,                                               // Message: Detailed human-readable log message
                timestamp: new Date().toISOString(),                            // Time: ISO timestamp
                displayTime: new Date().toLocaleTimeString()                    // Time: Formatted local time string
            });                                                                 // End: unshift
            if (logs.length > 50) logs.pop();                                   // Trim: Cap log trail to latest 50 entries
            localStorage.setItem(AUTH_STORAGE_LOGS, JSON.stringify(logs));     // Storage: Persist updated audit logs
        } catch (e) {                                                           // Catch: Ignore log storage failure
            console.error("Could not write security audit log", e);             // Error: Log to browser console
        }                                                                       // End: Try/catch
    }                                                                           // End: logSecurityEvent

    // STEP 1: USER IDENTIFICATION & PRIMARY AUTH (SALT + PEPPER)               // Section: Primary Authentication
    authenticateStep1(identifier, password) {                                   // Method: Validates username/email & password
        const user = this.getUserByIdentifier(identifier);                      // Identify: Locate user in database
        if (!user) {                                                            // Check: If user does not exist
            this.logSecurityEvent("LOGIN_FAILED_UNKNOWN_USER",                  // Audit: Log failed attempt for unknown user
                "Failed identification attempt for non-existent identifier: " + identifier); // Audit message
            return { success: false, reason: "Identification failed: No user found with those credentials." }; // Return: Error
        }                                                                       // End: Check
        const computedHash = hashPasswordWithSaltAndPepper(password, user.salt, AUTH_PEPPER); // Hash: Salt + Password + Pepper
        if (computedHash !== user.passwordHash) {                               // Check: Compare computed hash with stored hash
            this.logSecurityEvent("LOGIN_FAILED_BAD_PASSWORD",                  // Audit: Log invalid password attempt
                "Password verification failed for identified user " + user.username); // Audit message
            return { success: false, reason: "Authentication failed: Incorrect password provided." }; // Return: Error
        }                                                                       // End: Check
        this.pending2FAUser = user;                                             // Stage: Save user as pending 2FA challenge
        this.logSecurityEvent("PRIMARY_AUTH_SUCCESS",                           // Audit: Log successful Step 1
            "User " + user.username + " successfully identified and passed Salt+Pepper verification. Awaiting QR/2FA."); // Audit message
        return {                                                                // Return: Step 1 success descriptor
            success: true,                                                      // Success: Flag
            requires2FA: true,                                                  // 2FA: Challenge required
            user: {                                                             // Profile: Safe public profile summary
                id: user.id,                                                    // ID: User ID
                username: user.username,                                        // Username: User handle
                fullName: user.fullName,                                        // Name: Human name
                phone: user.phone || "+233 24 000 0000",                        // Phone: Mobile phone number
                role: user.role,                                                // Role: Role name
                roleTitle: user.roleTitle,                                      // Title: Role title
                avatarBg: user.avatarBg,                                        // Avatar: Visual gradient
                avatarText: user.avatarText,                                    // Avatar: Initials
                twoFactorSecret: user.twoFactorSecret                           // Secret: Base32 secret for simulator preview
            }                                                                   // End: Profile
        };                                                                      // End: Return descriptor
    }                                                                           // End: authenticateStep1

    // STEP 2A: TWO-FACTOR AUTHENTICATION (TOTP VERIFICATION)                   // Section: 2FA Verification
    authenticateStep2TOTP(code) {                                               // Method: Validates 6-digit TOTP token
        if (!this.pending2FAUser) {                                             // Guard: Check if user is staged for 2FA
            return { success: false, reason: "No pending 2FA verification session. Please log in first." }; // Error
        }                                                                       // End: Guard
        const isValid = verifyTOTPCode(code, this.pending2FAUser.twoFactorSecret); // Verify: Check TOTP against user secret
        if (!isValid) {                                                         // Check: If token is invalid or expired
            this.logSecurityEvent("2FA_FAILED",                                 // Audit: Log 2FA failure
                "Invalid 2FA TOTP code entered for user " + this.pending2FAUser.username); // Audit message
            return { success: false, reason: "Invalid or expired authentication code. Please check your mobile phone and try again." }; // Error
        }                                                                       // End: Check
        const authenticatedUser = this.pending2FAUser;                          // Reference: Staged user
        this.pending2FAUser = null;                                             // Clear: Reset staging state
        this.saveSession(authenticatedUser);                                    // Session: Activate logged in session
        this.logSecurityEvent("LOGIN_SUCCESS",                                  // Audit: Full login success event
            "User " + authenticatedUser.username + " successfully passed Mobile QR 2FA and gained authorized access."); // Audit message
        return { success: true, user: authenticatedUser };                      // Return: Complete success descriptor
    }                                                                           // End: authenticateStep2TOTP

    // STEP 2B: AUTH BACKUP RECOVERY CODE REDEMPTION                            // Section: Auth Backup Verification
    authenticateStep2BackupCode(enteredCode) {                                  // Method: Authenticates using emergency backup code
        if (!this.pending2FAUser) {                                             // Guard: Check if user is staged for 2FA
            return { success: false, reason: "No pending 2FA verification session. Please log in first." }; // Error
        }                                                                       // End: Guard
        const result = redeemAuthBackupCode(this.pending2FAUser, enteredCode);  // Redeem: Validate and burn single-use backup code
        if (!result.success) {                                                  // Check: If redemption failed
            this.logSecurityEvent("BACKUP_CODE_FAILED",                         // Audit: Log failed backup code attempt
                "Failed backup code attempt for user " + this.pending2FAUser.username + ": " + result.reason); // Audit message
            return result;                                                      // Return: Failure result with reason
        }                                                                       // End: Check
        const authenticatedUser = this.pending2FAUser;                          // Reference: Staged user
        this.pending2FAUser = null;                                             // Clear: Reset staging state
        this.saveSession(authenticatedUser);                                    // Session: Activate logged in session
        return {                                                                // Return: Success result
            success: true,                                                      // Success: Flag
            user: authenticatedUser,                                            // User: Active user record
            remaining: result.remaining,                                        // Remaining: Count of backup codes left
            burnedCode: result.code                                             // Code: Burned backup code
        };                                                                      // End: Return descriptor
    }                                                                           // End: authenticateStep2BackupCode

    // USER REGISTRATION & CREATION WITH CUSTOM ROW SCOPE & MOBILE AUTH         // Section: User Registration
    registerNewUser({ username, email, fullName, phone, password, role, roleTitle, rowScopeType, assignedClass, studentId }) {
        if (this.getUserByIdentifier(username)) {                               // Check: Duplicate username guard
            return { success: false, reason: "Username is already taken by another account." }; // Return: Duplicate error
        }                                                                       // End: Check
        if (this.getUserByIdentifier(email)) {                                  // Check: Duplicate email guard
            return { success: false, reason: "Email address is already registered." }; // Return: Duplicate error
        }                                                                       // End: Check
        const salt = generateSalt(16);                                          // Cryptography: Generate fresh 128-bit salt
        const passwordHash = hashPasswordWithSaltAndPepper(password, salt, AUTH_PEPPER); // Cryptography: Salt+Pepper hash
        const twoFactorSecret = generateBase32Secret(16);                       // 2FA: Generate fresh Base32 TOTP secret
        const backupCodes = generateEmergencyBackupCodes(8);                    // Auth Backup: Generate 8 single-use codes
        
        let determinedRole = role || "Teacher";
        let determinedRoleTitle = roleTitle || "";
        let determinedScopeType = rowScopeType || "ALL_ROWS";
        let determinedClass = assignedClass || "*";
        let determinedStudentId = studentId || null;
        let determinedAdmNo = null;

        if (determinedRole === "SuperAdmin") {
            determinedRoleTitle = roleTitle || "School Administrator";
            determinedScopeType = "ALL_ROWS";
            determinedClass = "*";
        } else if (determinedRole === "Teacher") {
            determinedRoleTitle = roleTitle || ((assignedClass || "Class") + " Teacher");
            determinedScopeType = "CLASS_ROWS_ONLY";
            determinedClass = assignedClass || "Primary 1";
        } else if (determinedRole === "Student") {
            determinedRoleTitle = roleTitle || ((assignedClass || "Basic") + " Student");
            determinedScopeType = "OWN_ROW_ONLY";
            determinedClass = assignedClass || "Primary 1";
            determinedStudentId = "std_" + Date.now().toString().slice(-4);
            determinedAdmNo = "PBE-2026-" + Math.floor(100 + Math.random() * 900);
        } else if (determinedRole === "Accountant" || determinedRole === "Bursar") {
            determinedRole = "Accountant";
            determinedRoleTitle = roleTitle || "Bursar & Accounts Staff";
            determinedScopeType = "FEES_ROWS_ONLY";
            determinedClass = "*";
        }

        const rowScope = {                                                      // Scope: Build row-level authorization descriptor
            scopeType: determinedScopeType,                                     // Type: Assigned scope type
            assignedClass: determinedClass,                                     // Class: Assigned class filter
            studentId: determinedStudentId,                                     // Student: Assigned student ID filter
            admissionNo: determinedAdmNo,                                       // Admission: Assigned student admission number
            canMutateAll: (determinedRole === "SuperAdmin"),                    // Mutation: Boolean flag for full mutation
            description: "Authorized scope: " + determinedScopeType + " (" + determinedClass + ")" // Description: Human readable scope
        };                                                                      // End: rowScope object

        const paletteList = [
            "linear-gradient(135deg, #6366f1, #a855f7)",
            "linear-gradient(135deg, #10b981, #059669)",
            "linear-gradient(135deg, #06b6d4, #3b82f6)",
            "linear-gradient(135deg, #f59e0b, #d97706)",
            "linear-gradient(135deg, #ec4899, #8b5cf6)"
        ];
        const randomBg = paletteList[Math.floor(Math.random() * paletteList.length)];
        const initials = fullName.split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase() || "US";

        const newUser = {                                                       // Record: Construct new user identity record
            id: "usr_" + Date.now(),                                            // ID: Unique timestamp ID
            username: username.trim(),                                          // Username: Trimmed username
            email: email.trim(),                                                // Email: Trimmed email
            phone: (phone || "+233 24 000 0000").trim(),                        // Phone: 2FA mobile phone number
            fullName: fullName.trim(),                                          // Full Name: Display name
            role: determinedRole,                                               // Role: Assigned role
            roleTitle: determinedRoleTitle,                                     // Role Title: Display title
            avatarBg: randomBg,                                                 // Avatar: Gradient background
            avatarText: initials,                                               // Avatar: Initials
            salt: salt,                                                         // Salt: Cryptographic unique salt
            passwordHash: passwordHash,                                         // Hash: Stored peppered password hash
            twoFactorSecret: twoFactorSecret,                                   // 2FA: Base32 TOTP secret key
            twoFactorEnabled: true,                                             // 2FA: Enabled flag
            backupCodes: backupCodes,                                           // Auth Backup: 8 single-use emergency codes
            rowScope: rowScope                                                  // Row Authorization: Row-level security policy
        };                                                                      // End: newUser object

        this.users.push(newUser);                                               // Array: Add new user to in-memory list
        this.saveUsers(this.users);                                             // Storage: Persist updated user database
        this.logSecurityEvent("USER_REGISTERED",                                // Audit: Log user registration event
            "New user " + newUser.username + " (" + newUser.role + ") registered with mobile phone: " + newUser.phone); // Audit message
        return { success: true, user: newUser };                                // Return: Success descriptor with new user
    }                                                                           // End: registerNewUser

    // LOGOUT & SESSION TERMINATION                                             // Section: Logout Management
    logout() {                                                                  // Method: Terminates current session
        const prevUser = this.currentSession;                                   // Reference: Previous active user
        this.saveSession(null);                                                 // Session: Clear session in storage and memory
        if (prevUser) {                                                         // Check: If user was logged in
            this.logSecurityEvent("LOGOUT",                                     // Audit: Log logout event
                "User " + prevUser.username + " logged out of system.");        // Audit message
        }                                                                       // End: Check
        this.showLoginOverlay();                                                // UI: Present login identification overlay
    }                                                                           // End: logout

    // QUICK SWITCH USER (DEMO HELPER FOR TESTING ROW-LEVEL AUTHORIZATION)      // Section: Quick Demo Role Switcher
    quickSwitchUser(username) {                                                 // Method: Instant switch for verifying row authorization
        const user = this.users.find(u => u.username === username);             // Search: Find target user
        if (!user) return false;                                                // Guard: Return false if not found
        this.saveSession(user);                                                 // Activate: Set active session
        this.logSecurityEvent("ROLE_SWITCHED",                                  // Audit: Log role switch
            "Active role switched to " + user.username + " (" + user.role + ") for row authorization testing."); // Audit message
        this.updateActiveUserUI();                                              // UI: Refresh user cards and badges
        if (window.app && typeof window.app.renderAllViews === "function") {     // App Check: If SchoolManagerApp is active
            window.app.renderAllViews();                                        // App: Re-render all views to apply row authorization
        }                                                                       // End: App check
        if (window.app && typeof window.app.showToast === "function") {         // Toast Check: If showToast exists
            window.app.showToast("Switched active identity to: " + user.fullName + " (" + user.roleTitle + ")", "info"); // Show toast
        }                                                                       // End: Toast check
        return true;                                                            // Return: True
    }                                                                           // End: quickSwitchUser

    // 7. ROW-LEVEL AUTHORIZATION ENGINE (ROW-LEVEL SECURITY / RLS)              // Section: Row-Level Authorization
    filterRowsByAuthorization(tableName, rows) {                               // Method: Evaluates row permissions per user scope
        if (!Array.isArray(rows)) return [];                                    // Guard: Ensure input is a valid array
        const user = this.currentSession;                                       // Context: Retrieve currently authenticated user
        if (!user) return [];                                                   // Guard: Unauthenticated users see zero rows
        const scope = user.rowScope || { scopeType: "ALL_ROWS" };               // Scope: Get row authorization scope descriptor
        if (user.role === "SuperAdmin" || scope.scopeType === "ALL_ROWS") {     // Admin Check: Full authorization for all rows
            return rows;                                                        // Return: All rows unhindered
        }                                                                       // End: Admin check
        if (scope.scopeType === "CLASS_ROWS_ONLY") {                            // Class Teacher Scope: Restricted to assigned class
            const targetClass = scope.assignedClass;                            // Target: Assigned class name (e.g. Primary 1)
            return rows.filter(row => {                                         // Filter: Evaluate each data row
                if (tableName === "students") return row.class === targetClass; // Students Table: Row class must match teacher class
                if (tableName === "attendance") return row.class === targetClass; // Attendance Table: Row class must match teacher class
                if (tableName === "grades") return row.class === targetClass;   // Grades Table: Row class must match teacher class
                if (tableName === "classes") return row.name === targetClass;   // Classes Table: Row name must match teacher class
                if (tableName === "fees") return row.class === targetClass;     // Fees Table: Row class must match teacher class
                return true;                                                    // Default: Retain non-class records
            });                                                                 // End: Filter loop
        }                                                                       // End: Class teacher scope
        if (scope.scopeType === "OWN_ROW_ONLY") {                               // Student/Parent Scope: Strictly own row only
            const targetStudentId = scope.studentId;                            // Target: Student ID (e.g. std-001)
            const targetAdmNo = scope.admissionNo;                              // Target: Admission number (e.g. PBE-2026-001)
            return rows.filter(row => {                                         // Filter: Evaluate each data row
                if (tableName === "students") {                                 // Students Table: Check id or admission number
                    return row.id === targetStudentId || row.admissionNo === targetAdmNo; // Match: Own student row
                }                                                               // End: Students check
                if (tableName === "fees") {                                     // Fees Table: Check student ID on fee record
                    return row.studentId === targetStudentId || row.admissionNo === targetAdmNo; // Match: Own fee row
                }                                                               // End: Fees check
                if (tableName === "attendance") {                               // Attendance Table: Check student ID on attendance log
                    return row.studentId === targetStudentId;                   // Match: Own attendance row
                }                                                               // End: Attendance check
                if (tableName === "grades") {                                   // Grades Table: Check student ID on score row
                    return row.studentId === targetStudentId;                   // Match: Own grade row
                }                                                               // End: Grades check
                return false;                                                   // Guard: Block all other tables for student role
            });                                                                 // End: Filter loop
        }                                                                       // End: Student scope
        if (scope.scopeType === "FEES_ROWS_ONLY") {                             // Accountant Scope: Access to fee rows
            if (tableName === "fees" || tableName === "students") return rows;  // Access: Fees and student billing rows permitted
            return rows;                                                        // Return: All rows but mutations are guarded
        }                                                                       // End: Accountant scope
        return rows;                                                            // Default fallback: Return rows
    }                                                                           // End: filterRowsByAuthorization

    canMutateRow(tableName, row, action = "update") {                           // Method: Validates Add/Edit/Delete row permissions
        const user = this.currentSession;                                       // Context: Retrieve current authenticated user
        if (!user) return { allowed: false, reason: "You are not logged in." }; // Guard: Reject if no active session
        if (user.role === "SuperAdmin") {                                       // Admin Check: Full mutation rights
            return { allowed: true, reason: "SuperAdmin has global row permissions." }; // Allowed: Admin
        }                                                                       // End: Admin check
        if (user.role === "Student") {                                          // Student Check: Students have read-only row access
            return { allowed: false, reason: "Row Authorization Denied: Student accounts have read-only row access." }; // Denied
        }                                                                       // End: Student check
        const scope = user.rowScope || {};                                      // Scope: Get scope policy
        if (scope.scopeType === "CLASS_ROWS_ONLY") {                            // Class Teacher Check: Can only mutate own class rows
            const assignedClass = scope.assignedClass;                          // Assigned: Teacher assigned class
            const rowClass = row ? (row.class || row.name || row.assignedClass) : null; // Row Class: Class property on row
            if (rowClass && rowClass !== assignedClass) {                       // Compare: Reject if row belongs to another class
                return {                                                        // Return: Explicit authorization denial
                    allowed: false,                                             // Allowed: False
                    reason: "Row Authorization Violation: You are assigned to " + assignedClass + ". You cannot " + action + " rows for " + rowClass + "." // Reason
                };                                                              // End: Return
            }                                                                   // End: Compare
            return { allowed: true, reason: "Authorized for row in " + assignedClass + "." }; // Allowed: Valid class row
        }                                                                       // End: Class teacher check
        if (scope.scopeType === "FEES_ROWS_ONLY") {                             // Accountant Check: Can only mutate financial rows
            if (tableName !== "fees" && action !== "read") {                    // Check: Reject mutation on non-financial tables
                return {                                                        // Return: Explicit authorization denial
                    allowed: false,                                             // Allowed: False
                    reason: "Row Authorization Violation: Accountant role is only authorized to create and modify fee rows." // Reason
                };                                                              // End: Return
            }                                                                   // End: Check
            return { allowed: true, reason: "Authorized for fee row mutation." }; // Allowed: Fee row
        }                                                                       // End: Accountant check
        return { allowed: true, reason: "Authorized by default policy." };      // Fallback: Allowed
    }                                                                           // End: canMutateRow

    assertRowMutation(tableName, row, action = "update") {                      // Method: Enforces row mutation guard
        const check = this.canMutateRow(tableName, row, action);                // Evaluate: Run row authorization check
        if (!check.allowed) {                                                   // Check: If authorization failed
            if (window.app && typeof window.app.showToast === "function") {     // Toast Check: If showToast exists
                window.app.showToast(check.reason, "error");                    // UI: Show error toast notification
            } else {                                                            // Else: Alert fallback
                alert(check.reason);                                            // UI: Show browser alert
            }                                                                   // End: Toast check
            this.logSecurityEvent("ROW_AUTHORIZATION_DENIED",                   // Audit: Log row violation attempt
                "Denied " + action + " on " + tableName + " row by " + this.currentSession.username + ": " + check.reason); // Audit message
            return false;                                                       // Block: Return false
        }                                                                       // End: Check
        return true;                                                            // Permit: Return true
    }                                                                           // End: assertRowMutation

    // 8. UI GENERATION, LOGIN OVERLAY, SIGN UP, QR 2FA & MOBILE COMPANION       // Section: UI Presentation
    initUI() {                                                                  // Method: Injects auth UI components into DOM
        this.injectAuthStyles();                                                // CSS: Inject dedicated authentication styles
        this.injectAuthModals();                                                // HTML: Inject login screen and auth backup modals
        this.bindAuthEvents();                                                  // Events: Bind event listeners for auth forms
        this.listenForMobilePushApproval();                                     // Sync: Listen for mobile push approvals from companion page
        if (!this.currentSession) {                                             // Check: If no user is logged in
            this.showLoginOverlay();                                            // UI: Prompt for user identification
        } else {                                                                // Else: User session exists
            this.updateActiveUserUI();                                          // UI: Update sidebar and top header
        }                                                                       // End: Check
    }                                                                           // End: initUI

    // Listen for mobile push approval events from companion phone window / device
    listenForMobilePushApproval() {
        window.addEventListener("storage", (e) => {
            if (e.key === "PROF_BAIDOO_MOBILE_PUSH_AUTH" && e.newValue) {
                try {
                    const data = JSON.parse(e.newValue);
                    if (this.pending2FAUser && (!data.username || data.username.toLowerCase() === this.pending2FAUser.username.toLowerCase())) {
                        if (data.code && data.code.length === 6) {
                            for (let i = 0; i < 6; i++) {
                                const el = document.getElementById("totpD" + (i + 1));
                                if (el) el.value = data.code[i];
                            }
                            if (window.app && typeof window.app.showToast === "function") {
                                window.app.showToast("⚡ Mobile Push Approval received from your mobile phone! Verifying...", "info");
                            }
                            setTimeout(() => {
                                this.handleStep2Submit();
                            }, 500);
                        }
                    }
                } catch (err) {}
            }
        });
    }

    injectAuthStyles() {                                                        // Method: Injects dedicated CSS styling for auth screens
        if (document.getElementById("smsAuthStyles")) return;                   // Guard: Avoid duplicate stylesheet injection
        const style = document.createElement("style");                          // Element: Create style tag
        style.id = "smsAuthStyles";                                             // ID: Assign unique element ID
        style.textContent = [
            ".auth-overlay { position: fixed; inset: 0; z-index: 99999; background: rgba(10, 15, 29, 0.94); backdrop-filter: blur(16px); display: flex; align-items: center; justify-content: center; padding: 1rem; overflow-y: auto; transition: opacity 0.3s ease; }",
            ".auth-overlay.hidden { display: none !important; opacity: 0; pointer-events: none; }",
            ".auth-card { width: 100%; max-width: 580px; max-height: 94vh; display: flex; flex-direction: column; background: var(--bg-card, #131b2e); border: 1px solid var(--border, rgba(255,255,255,0.1)); border-radius: 20px; box-shadow: 0 25px 60px rgba(0,0,0,0.6); overflow: hidden; animation: authFadeIn 0.35s ease-out; }",
            "@keyframes authFadeIn { from { opacity: 0; transform: translateY(18px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }",
            ".auth-header { padding: 1.25rem 1.6rem 0.85rem; background: linear-gradient(180deg, rgba(99, 102, 241, 0.12) 0%, transparent 100%); border-bottom: 1px solid var(--border, rgba(255,255,255,0.08)); text-align: center; flex-shrink: 0; }",
            ".auth-brand-badge { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.3rem 0.85rem; border-radius: 999px; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); font-size: 0.72rem; font-weight: 700; color: #818cf8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.45rem; }",
            ".auth-title { font-size: 1.35rem; font-weight: 800; color: var(--text-primary, #fff); margin-bottom: 0.2rem; letter-spacing: -0.3px; }",
            ".auth-sub { font-size: 0.82rem; color: var(--text-muted, #94a3b8); line-height: 1.35; }",
            ".auth-body { padding: 1.1rem 1.6rem 1.5rem; overflow-y: auto; flex: 1; }",

            "/* Tab Switcher: Sign In vs Sign Up */",
            ".auth-tabs-nav { display: flex; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 4px; margin-bottom: 1.15rem; gap: 4px; }",
            ".auth-tab-btn { flex: 1; padding: 0.65rem 0.9rem; border: none; border-radius: 9px; font-size: 0.84rem; font-weight: 700; color: #94a3b8; background: transparent; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: center; gap: 0.45rem; }",
            ".auth-tab-btn:hover { color: #fff; background: rgba(255,255,255,0.06); }",
            ".auth-tab-btn.active { color: #fff; background: #4f46e5; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4); }",

            "/* Form Grid & Field Group Layout */",
            ".auth-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem; }",
            "@media (max-width: 560px) { .auth-grid-2 { grid-template-columns: 1fr; gap: 0.75rem; } }",
            ".auth-field { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 0.85rem; position: relative; }",
            ".auth-grid-2 .auth-field { margin-bottom: 0; }",
            ".auth-label { font-size: 0.78rem; font-weight: 700; color: #cbd5e1; display: flex; align-items: center; gap: 3px; }",
            ".auth-label .required-dot { color: #ef4444; font-weight: 800; font-size: 0.85rem; }",

            "/* Input Box & Bulletproof Icon Clearance */",
            ".auth-input-box { position: relative; display: flex; align-items: center; width: 100%; }",
            ".auth-input-box > .auth-lead-icon { position: absolute; left: 0.95rem; top: 50%; transform: translateY(-50%); font-size: 1.15rem; color: #94a3b8; pointer-events: none; z-index: 3; line-height: 1; transition: color 0.2s ease; }",
            ".auth-input-box:focus-within > .auth-lead-icon { color: #6366f1; }",
            ".auth-input { width: 100%; height: 44px; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 0 0.9rem 0 2.65rem !important; color: #ffffff; font-size: 0.86rem; font-family: inherit; outline: none; transition: all 0.2s ease; box-sizing: border-box; }",
            ".auth-input::placeholder { color: #64748b; font-size: 0.82rem; }",
            ".auth-input:focus { background: rgba(255,255,255,0.1); border-color: #818cf8; box-shadow: 0 0 0 3px rgba(99,102,241,0.25); }",

            "/* Select Dropdown Styling */",
            ".auth-select { appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: 2.35rem !important; background-image: url(\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%2394a3b8%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27%3E%3C/path%3E%3C/svg%3E\'); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 1.05rem; }",
            ".auth-select option { background: #1e293b; color: #f8fafc; }",

            "/* Password Input & Eye Toggle */",
            ".auth-input.has-pwd-toggle { padding-right: 2.75rem !important; }",
            ".auth-pwd-btn { position: absolute; right: 0.45rem; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: transparent; border: none; color: #94a3b8; cursor: pointer; border-radius: 8px; z-index: 5; padding: 0; margin: 0; transition: all 0.2s; }",
            ".auth-pwd-btn:hover { color: #38bdf8; background: rgba(255,255,255,0.08); }",
            ".auth-pwd-btn i, .btn-pwd-toggle i, .filter-input-wrap .btn-pwd-toggle i, .auth-input-box .auth-pwd-btn i { position: static !important; transform: none !important; left: auto !important; top: auto !important; font-size: 1.15rem !important; color: inherit !important; pointer-events: none !important; line-height: 1 !important; }",

            "/* Primary Action Button */",
            ".auth-btn-primary { width: 100%; height: 44px; background: linear-gradient(135deg, #4f46e5, #6366f1); color: #ffffff; border: none; border-radius: 10px; font-size: 0.88rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.55rem; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35); transition: all 0.2s ease; margin-top: 0.4rem; }",
            ".auth-btn-primary:hover { background: linear-gradient(135deg, #4338ca, #4f46e5); box-shadow: 0 6px 20px rgba(79, 70, 229, 0.45); transform: translateY(-1px); }",
            ".auth-btn-primary:active { transform: translateY(0); }",

            "/* Password Strength Meter */",
            ".pwd-strength-container { margin-top: 0.35rem; margin-bottom: 0.85rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 0.55rem 0.8rem; }",
            ".pwd-strength-bar { height: 5px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; display: flex; margin-bottom: 0.35rem; }",
            ".pwd-strength-fill { height: 100%; width: 0%; border-radius: 999px; transition: width 0.3s ease, background-color 0.3s ease; }",
            ".pwd-strength-text { font-size: 0.74rem; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; }",

            "/* Demo Chips */",
            ".demo-chips-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.45rem; margin-bottom: 0.85rem; }",
            ".demo-chip { padding: 0.35rem 0.5rem; border-radius: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); cursor: pointer; text-align: left; transition: all 0.2s; display: flex; flex-direction: column; gap: 1px; }",
            ".demo-chip:hover { background: rgba(99,102,241,0.15); border-color: #6366f1; transform: translateY(-1px); }",
            ".demo-chip-name { font-size: 0.76rem; font-weight: 700; color: #fff; line-height: 1.2; }",
            ".demo-chip-role { font-size: 0.65rem; color: #94a3b8; line-height: 1.2; }",
            ".demo-chip-scope { font-size: 0.62rem; color: #a5b4fc; font-weight: 600; line-height: 1.2; }",

            "/* Step Indicators */",
            ".auth-steps-pill { display: flex; align-items: center; justify-content: center; gap: 0.4rem; margin-top: 0.35rem; margin-bottom: 0.15rem; }",
            ".auth-step-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.2); transition: all 0.3s; }",
            ".auth-step-dot.active { width: 22px; border-radius: 4px; background: var(--primary, #6366f1); }",

            "/* 2FA Mode Navigation */",
            ".auth-2fa-mode-nav { display: flex; justify-content: center; gap: 0.4rem; margin-bottom: 0.9rem; }",
            ".auth-2fa-mode-pill { padding: 0.35rem 0.75rem; border-radius: 999px; font-size: 0.74rem; font-weight: 700; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.35rem; }",
            ".auth-2fa-mode-pill:hover { color: #fff; background: rgba(255,255,255,0.08); }",
            ".auth-2fa-mode-pill.active { background: rgba(99,102,241,0.2); border-color: #6366f1; color: #818cf8; box-shadow: 0 0 10px rgba(99,102,241,0.3); }",

            "/* QR Code Card */",
            ".qr-code-card { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.15rem 1rem; background: rgba(15,23,42,0.6); border: 1px solid rgba(99,102,241,0.25); border-radius: 16px; margin-bottom: 0.85rem; position: relative; overflow: hidden; }",
            ".qr-wrapper-frame { position: relative; padding: 10px; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: inline-block; margin-bottom: 0.85rem; }",
            ".qr-scanline { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #38bdf8, transparent); box-shadow: 0 0 8px #38bdf8; animation: qrScanline 2.2s infinite ease-in-out; pointer-events: none; }",
            "@keyframes qrScanline { 0% { top: 8px; opacity: 0.9; } 50% { top: calc(100% - 10px); opacity: 1; } 100% { top: 8px; opacity: 0.9; } }",
            ".qr-instruction-steps { font-size: 0.74rem; color: #cbd5e1; line-height: 1.45; text-align: left; max-width: 380px; width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 0.6rem 0.8rem; margin-bottom: 0.7rem; }",

            "/* Smartphone Live Mockup / Simulator */",
            ".phone-simulator-wrapper { max-width: 290px; margin: 0 auto 0.85rem; background: #000000; border-radius: 30px; padding: 10px 8px; border: 3px solid #334155; box-shadow: 0 20px 45px rgba(0,0,0,0.8); position: relative; }",
            ".phone-notch { width: 80px; height: 14px; background: #000000; border-radius: 0 0 10px 10px; margin: 0 auto 4px; display: flex; align-items: center; justify-content: center; }",
            ".phone-speaker { width: 32px; height: 3px; background: #334155; border-radius: 3px; }",
            ".phone-screen { background: linear-gradient(180deg, #090e1a 0%, #111827 100%); border-radius: 20px; padding: 10px; border: 1px solid rgba(255,255,255,0.08); color: #fff; text-align: center; }",
            ".phone-status-bar { display: flex; justify-content: space-between; align-items: center; font-size: 0.65rem; color: #94a3b8; font-weight: 600; margin-bottom: 8px; padding: 0 2px; }",
            ".phone-notif-banner { background: rgba(30, 41, 59, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(99,102,241,0.4); border-radius: 10px; padding: 6px 8px; margin-bottom: 8px; text-align: left; animation: phoneNotifDrop 0.4s ease-out; }",
            "@keyframes phoneNotifDrop { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }",
            ".phone-code-display { font-family: 'JetBrains Mono', monospace; font-size: 1.65rem; font-weight: 800; letter-spacing: 5px; color: #38bdf8; text-shadow: 0 0 16px rgba(56,189,248,0.5); margin: 6px 0; }",
            ".phone-action-btn { width: 100%; padding: 0.5rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.35rem; transition: all 0.2s; margin-top: 0.4rem; }",
            ".phone-btn-approve { background: linear-gradient(135deg, #10b981, #059669); color: #fff; box-shadow: 0 4px 12px rgba(16,185,129,0.3); }",
            ".phone-btn-approve:hover { filter: brightness(1.1); transform: scale(1.02); }",
            ".phone-btn-copy { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #f8fafc; }",

            "/* SMS Dispatch Simulation Card */",
            ".sms-dispatch-card { background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.25); border-radius: 12px; padding: 0.85rem; margin-bottom: 0.85rem; text-align: left; }",

            "/* TOTP Digit Inputs */",
            ".totp-input-group { display: flex; justify-content: center; gap: 0.45rem; margin: 0.75rem 0; }",
            ".totp-digit { width: 44px; height: 50px; font-size: 1.4rem; font-weight: 800; text-align: center; border-radius: 10px; background: rgba(255,255,255,0.06); border: 2px solid rgba(255,255,255,0.15); color: #fff; font-family: monospace; transition: all 0.2s; }",
            ".totp-digit:focus { border-color: #6366f1; background: rgba(99,102,241,0.15); outline: none; box-shadow: 0 0 12px rgba(99,102,241,0.4); }",

            "/* RLS Banners & Header Pill */",
            ".rls-banner { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.25rem; background: linear-gradient(90deg, rgba(99,102,241,0.12), rgba(16,185,129,0.12)); border: 1px solid rgba(99,102,241,0.25); border-radius: 12px; margin-bottom: 1.25rem; }",
            ".rls-banner-left { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; font-weight: 600; color: var(--text-primary, #fff); }",
            ".rls-scope-tag { padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; background: rgba(99,102,241,0.2); color: #a5b4fc; }",
            ".backup-codes-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; margin: 1rem 0; }",
            ".backup-code-item { padding: 0.6rem 0.85rem; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); font-family: monospace; font-weight: 700; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; }",
            ".backup-code-item.used { text-decoration: line-through; opacity: 0.45; background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); }",
            ".header-rls-pill-box { display: flex; align-items: center; gap: 0.4rem; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3); padding: 0.25rem 0.6rem; border-radius: 999px; flex-shrink: 1; min-width: 0; }",
            ".header-rls-role-label { font-size: 0.75rem; font-weight: 700; color: #fff; }",
            ".header-rls-scope-tag { font-size: 0.65rem; background: rgba(99,102,241,0.3); color: #c7d2fe; padding: 1px 6px; border-radius: 4px; }",
            ".header-rls-switcher-select { max-width: 130px; text-overflow: ellipsis; white-space: nowrap; background: transparent; border: none; color: #a5b4fc; font-size: 0.75rem; font-weight: 700; cursor: pointer; outline: none; }",

            "/* Light Theme Overrides */",
            "[data-theme='light'] .auth-overlay { background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(14px); }",
            "[data-theme='light'] .auth-card { background: #ffffff; border-color: #e2e8f0; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25); }",
            "[data-theme='light'] .auth-header { background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); border-bottom-color: #e2e8f0; }",
            "[data-theme='light'] .auth-brand-badge { background: #eef2ff; border-color: #c7d2fe; color: #4338ca; }",
            "[data-theme='light'] .auth-title { color: #0f172a; }",
            "[data-theme='light'] .auth-sub { color: #64748b; }",
            "[data-theme='light'] .auth-tabs-nav { background: #f1f5f9; border-color: #e2e8f0; }",
            "[data-theme='light'] .auth-tab-btn { color: #64748b; }",
            "[data-theme='light'] .auth-tab-btn:hover { color: #0f172a; background: #e2e8f0; }",
            "[data-theme='light'] .auth-tab-btn.active { color: #ffffff; background: #4f46e5; }",
            "[data-theme='light'] .auth-label { color: #334155; }",
            "[data-theme='light'] .auth-input { background: #ffffff; border-color: #cbd5e1; color: #0f172a; }",
            "[data-theme='light'] .auth-input::placeholder { color: #94a3b8; }",
            "[data-theme='light'] .auth-input:focus { background: #ffffff; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15); }",
            "[data-theme='light'] .auth-input-box:focus-within > .auth-lead-icon { color: #4f46e5; }",
            "[data-theme='light'] .auth-select option { background: #ffffff; color: #0f172a; }",
            "[data-theme='light'] .auth-pwd-btn:hover { color: #4f46e5; background: rgba(79, 70, 229, 0.08); }",
            "[data-theme='light'] .pwd-strength-container { background: #f8fafc; border-color: #e2e8f0; }",
            "[data-theme='light'] .pwd-strength-bar { background: #e2e8f0; }",
            "[data-theme='light'] .pwd-strength-text { color: #64748b; }",
            "[data-theme='light'] .demo-chip { background: #f8fafc; border-color: #e2e8f0; }",
            "[data-theme='light'] .demo-chip:hover { background: #eef2ff; border-color: #6366f1; }",
            "[data-theme='light'] .demo-chip-name { color: #0f172a; }",
            "[data-theme='light'] .demo-chip-role { color: #64748b; }",
            "[data-theme='light'] .demo-chip-scope { color: #4338ca; }",
            "[data-theme='light'] .qr-code-card { background: #f8fafc; border-color: #e2e8f0; }",
            "[data-theme='light'] .qr-instruction-steps { background: #ffffff; border-color: #e2e8f0; color: #334155; }",
            "[data-theme='light'] .totp-digit { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }",
            "[data-theme='light'] .totp-digit:focus { background: #ffffff; border-color: #4338ca; box-shadow: 0 0 0 3px rgba(67, 56, 202, 0.15); }",
            "[data-theme='light'] .rls-banner { background: linear-gradient(90deg, #eef2ff, #ecfdf5); border-color: #c7d2fe; }",
            "[data-theme='light'] .rls-banner-left { color: #0f172a; }",
            "[data-theme='light'] .rls-scope-tag { background: #e0e7ff; color: #3730a3; }",
            "[data-theme='light'] .backup-code-item { background: #f8fafc; border-color: #e2e8f0; color: #0f172a; }",
            "[data-theme='light'] .backup-code-item.used { background: #fef2f2; border-color: #fecaca; color: #991b1b; }",
            "[data-theme='light'] .header-rls-pill-box { background: #eef2ff !important; border-color: #c7d2fe !important; }",
            "[data-theme='light'] .header-rls-role-label { color: #0f172a !important; }",
            "[data-theme='light'] .header-rls-scope-tag { background: #e0e7ff !important; color: #3730a3 !important; }",
            "[data-theme='light'] .header-rls-switcher-select { color: #4338ca !important; }",
            "[data-theme='light'] .header-rls-switcher-select option { background: #ffffff !important; color: #0f172a !important; }"
        ].join("\n");
        document.head.appendChild(style);
    }

    injectAuthModals() {                                                        // Method: Injects authentication screen overlay and modals
        if (document.getElementById("authScreenOverlay")) return;               // Guard: Avoid duplicate modal DOM injection
        const container = document.createElement("div");                        // Element: Wrapper container
        container.innerHTML = [
            '<div id="authScreenOverlay" class="auth-overlay hidden">',
            '    <div class="auth-card">',
            '        <!-- Auth Modal Header -->',
            '        <div class="auth-header">',
            '            <div class="auth-brand-badge">',
            '                <i class="ri-shield-keyhole-line"></i>',
            '                <span>Prof~Baidoo SMS Security Gate</span>',
            '            </div>',
            '            <h2 class="auth-title" id="authScreenTitle">User Identification</h2>',
            '            <p class="auth-sub" id="authScreenSub">Verify credentials & authenticate with mobile QR code</p>',
            '            <div class="auth-steps-pill">',
            '                <div class="auth-step-dot active" id="authDotStep1"></div>',
            '                <div class="auth-step-dot" id="authDotStep2"></div>',
            '            </div>',
            '        </div>',
            '',
            '        <!-- Auth Modal Body -->',
            '        <div class="auth-body">',
            '',
            '            <!-- STEP 1: Identification (Sign In or Sign Up) -->',
            '            <div id="authStep1Form">',
            '                <!-- Top Switcher: Sign In vs Sign Up -->',
            '                <div class="auth-tabs-nav">',
            '                    <button type="button" class="auth-tab-btn active" id="tabBtnSignIn" onclick="SMSAuth.toggleAuthTab(\'signin\')">',
            '                        <i class="ri-login-box-line"></i> Sign In',
            '                    </button>',
            '                    <button type="button" class="auth-tab-btn" id="tabBtnSignUp" onclick="SMSAuth.toggleAuthTab(\'signup\')">',
            '                        <i class="ri-user-add-line"></i> Sign Up / Register',
            '                    </button>',
            '                </div>',
            '',
            '                <!-- 1A: SIGN IN PANEL -->',
            '                <div id="authSignInPanel">',
            '                    <label class="form-label" style="margin-bottom:0.4rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px;">Quick Identity Demo Switcher:</label>',
            '                    <div class="demo-chips-grid">',
            '                        <button type="button" class="demo-chip" onclick="SMSAuth.fillDemoAccount(\'admin\', \'Admin@2026!\')">',
            '                            <span class="demo-chip-name">Prof. Baidoo</span>',
            '                            <span class="demo-chip-role">Super Admin</span>',
            '                            <span class="demo-chip-scope">All Rows (*)</span>',
            '                        </button>',
            '                        <button type="button" class="demo-chip" onclick="SMSAuth.fillDemoAccount(\'teacher.grace\', \'Grace@2026!\')">',
            '                            <span class="demo-chip-name">Madam Grace</span>',
            '                            <span class="demo-chip-role">Teacher</span>',
            '                            <span class="demo-chip-scope">Primary 1</span>',
            '                        </button>',
            '                        <button type="button" class="demo-chip" onclick="SMSAuth.fillDemoAccount(\'teacher.ebenezer\', \'Ebenezer@2026!\')">',
            '                            <span class="demo-chip-name">Mr. Mensah</span>',
            '                            <span class="demo-chip-role">Teacher</span>',
            '                            <span class="demo-chip-scope">Primary 2</span>',
            '                        </button>',
            '                        <button type="button" class="demo-chip" onclick="SMSAuth.fillDemoAccount(\'bursar\', \'Bursar@2026!\')">',
            '                            <span class="demo-chip-name">Mr. Boateng</span>',
            '                            <span class="demo-chip-role">Accountant</span>',
            '                            <span class="demo-chip-scope">Billing Rows</span>',
            '                        </button>',
            '                        <button type="button" class="demo-chip" onclick="SMSAuth.fillDemoAccount(\'std.kwame\', \'Student@2026!\')">',
            '                            <span class="demo-chip-name">Kwame Mensah</span>',
            '                            <span class="demo-chip-role">Student</span>',
            '                            <span class="demo-chip-scope">Own Row Only</span>',
            '                        </button>',
            '                    </div>',
            '',
            '                    <form id="formAuthStep1" onsubmit="event.preventDefault(); SMSAuth.handleStep1Submit();">',
            '                        <div class="auth-field">',
            '                            <label class="auth-label" for="authInputIdentifier">Username or Email <span class="required-dot">*</span></label>',
            '                            <div class="auth-input-box">',
            '                                <i class="ri-user-line auth-lead-icon"></i>',
            '                                <input type="text" id="authInputIdentifier" class="auth-input" autocomplete="username" placeholder="e.g. admin or teacher.grace" required autofocus>',
            '                            </div>',
            '                        </div>',
            '                        <div class="auth-field">',
            '                            <label class="auth-label" for="authInputPassword">Password <span class="required-dot">*</span></label>',
            '                            <div class="auth-input-box">',
            '                                <i class="ri-lock-password-line auth-lead-icon"></i>',
            '                                <input type="password" id="authInputPassword" class="auth-input has-pwd-toggle" autocomplete="current-password" placeholder="Enter secure password" required>',
            '                                <button type="button" class="auth-pwd-btn" onclick="SMSAuth.togglePasswordVisibility(\'authInputPassword\', this)" title="Show/Hide Password">',
            '                                    <i class="ri-eye-line"></i>',
            '                                </button>',
            '                            </div>',
            '                        </div>',
            '                        <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:0.85rem; display:flex; align-items:center; justify-content:space-between;">',
            '                            <div style="display:flex; align-items:center; gap:0.4rem;">',
            '                                <i class="ri-shield-check-fill" style="color:#10b981;"></i>',
            '                                <span>Salt + Pepper Encryption</span>',
            '                            </div>',
            '                            <button type="button" style="background:none; border:none; color:#818cf8; font-size:0.75rem; font-weight:600; cursor:pointer;" onclick="SMSAuth.toggleAuthTab(\'signup\')">Need an account? Sign Up</button>',
            '                        </div>',
            '                        <button type="submit" class="auth-btn-primary" id="btnSubmitSignIn">',
            '                            <i class="ri-qr-code-line"></i> Verify Identity & Proceed to Mobile QR Code Auth',
            '                        </button>',
            '                    </form>',
            '                </div>',
            '',
            '                <!-- 1B: SIGN UP PANEL (NEW USER REGISTRATION) -->',
            '                <div id="authSignUpPanel" style="display:none;">',
            '                    <form id="formAuthSignUp" onsubmit="event.preventDefault(); SMSAuth.handleSignUpSubmit();">',
            '                        <div class="auth-grid-2">',
            '                            <div class="auth-field">',
            '                                <label class="auth-label" for="signupFullName">Full Name <span class="required-dot">*</span></label>',
            '                                <div class="auth-input-box">',
            '                                    <i class="ri-user-3-line auth-lead-icon"></i>',
            '                                    <input type="text" id="signupFullName" class="auth-input" placeholder="e.g. Mr. Johnson Quainoo" required>',
            '                                </div>',
            '                            </div>',
            '                            <div class="auth-field">',
            '                                <label class="auth-label" for="signupUsername">Username <span class="required-dot">*</span></label>',
            '                                <div class="auth-input-box">',
            '                                    <i class="ri-at-line auth-lead-icon"></i>',
            '                                    <input type="text" id="signupUsername" class="auth-input" autocomplete="username" placeholder="e.g. hnquay" required>',
            '                                </div>',
            '                            </div>',
            '                        </div>',
            '                        <div class="auth-grid-2">',
            '                            <div class="auth-field">',
            '                                <label class="auth-label" for="signupEmail">Email Address <span class="required-dot">*</span></label>',
            '                                <div class="auth-input-box">',
            '                                    <i class="ri-mail-line auth-lead-icon"></i>',
            '                                    <input type="email" id="signupEmail" class="auth-input" autocomplete="email" placeholder="johnsonquainoo@gmail.com" required>',
            '                                </div>',
            '                            </div>',
            '                            <div class="auth-field">',
            '                                <label class="auth-label" for="signupPhone">Mobile Phone <span class="required-dot">*</span> <span style="font-size:0.7rem; font-weight:normal; color:#94a3b8;">(for 2FA/QR)</span></label>',
            '                                <div class="auth-input-box">',
            '                                    <i class="ri-smartphone-line auth-lead-icon"></i>',
            '                                    <input type="tel" id="signupPhone" class="auth-input" inputmode="tel" placeholder="0256331492" required>',
            '                                </div>',
            '                            </div>',
            '                        </div>',
            '                        <div class="auth-grid-2">',
            '                            <div class="auth-field">',
            '                                <label class="auth-label" for="signupRole">Account Role <span class="required-dot">*</span></label>',
            '                                <div class="auth-input-box">',
            '                                    <i class="ri-shield-user-line auth-lead-icon"></i>',
            '                                    <select id="signupRole" class="auth-input auth-select" onchange="SMSAuth.handleRoleSelectionChange(this.value)">',
            '                                        <option value="Teacher">Teacher (Class Row Scope)</option>',
            '                                        <option value="Student">Student/Parent (Own Row Only)</option>',
            '                                        <option value="Accountant">Bursar / Accountant (Fees Only)</option>',
            '                                        <option value="SuperAdmin">Administrator (All Rows Global)</option>',
            '                                    </select>',
            '                                </div>',
            '                            </div>',
            '                            <div class="auth-field" id="signupClassGroup">',
            '                                <label class="auth-label" for="signupClass">Class Assignment <span class="required-dot">*</span></label>',
            '                                <div class="auth-input-box">',
            '                                    <i class="ri-book-open-line auth-lead-icon"></i>',
            '                                    <select id="signupClass" class="auth-input auth-select">',
            '                                        <option value="Primary 1">Primary 1</option>',
            '                                        <option value="Primary 2">Primary 2</option>',
            '                                        <option value="Primary 3">Primary 3</option>',
            '                                        <option value="Primary 4">Primary 4</option>',
            '                                        <option value="Primary 5">Primary 5</option>',
            '                                        <option value="Primary 6">Primary 6</option>',
            '                                        <option value="JHS 1">JHS 1</option>',
            '                                        <option value="JHS 2">JHS 2</option>',
            '                                        <option value="JHS 3">JHS 3</option>',
            '                                        <option value="KG 1">KG 1</option>',
            '                                        <option value="KG 2">KG 2</option>',
            '                                    </select>',
            '                                </div>',
            '                            </div>',
            '                        </div>',
            '                        <div class="auth-grid-2">',
            '                            <div class="auth-field">',
            '                                <label class="auth-label" for="signupPassword">Password <span class="required-dot">*</span></label>',
            '                                <div class="auth-input-box">',
            '                                    <i class="ri-lock-line auth-lead-icon"></i>',
            '                                    <input type="password" id="signupPassword" class="auth-input has-pwd-toggle" autocomplete="new-password" placeholder="Create password" required oninput="SMSAuth.handlePasswordStrength(this.value)">',
            '                                    <button type="button" class="auth-pwd-btn" onclick="SMSAuth.togglePasswordVisibility(\'signupPassword\', this)" title="Show/Hide Password">',
            '                                        <i class="ri-eye-line"></i>',
            '                                    </button>',
            '                                </div>',
            '                            </div>',
            '                            <div class="auth-field">',
            '                                <label class="auth-label" for="signupConfirmPassword">Confirm Password <span class="required-dot">*</span></label>',
            '                                <div class="auth-input-box">',
            '                                    <i class="ri-shield-key-line auth-lead-icon"></i>',
            '                                    <input type="password" id="signupConfirmPassword" class="auth-input has-pwd-toggle" autocomplete="new-password" placeholder="Repeat password" required>',
            '                                    <button type="button" class="auth-pwd-btn" onclick="SMSAuth.togglePasswordVisibility(\'signupConfirmPassword\', this)" title="Show/Hide Password">',
            '                                        <i class="ri-eye-line"></i>',
            '                                    </button>',
            '                                </div>',
            '                            </div>',
            '                        </div>',
            '                        <div class="pwd-strength-container">',
            '                            <div class="pwd-strength-bar">',
            '                                <div class="pwd-strength-fill" id="signupStrengthFill"></div>',
            '                            </div>',
            '                            <div class="pwd-strength-text">',
            '                                <span>Security Strength: <strong id="signupStrengthText" style="color:#ef4444; font-weight:700;">Weak</strong></span>',
            '                                <span style="display:inline-flex; align-items:center; gap:0.35rem; color:#818cf8; font-weight:600;"><i class="ri-qr-code-line"></i> Instant Mobile QR Session</span>',
            '                            </div>',
            '                        </div>',
            '                        <button type="submit" class="auth-btn-primary" id="btnSubmitSignUp">',
            '                            <i class="ri-user-add-line"></i> Complete Sign Up & Launch Mobile QR Authentication',
            '                        </button>',
            '                    </form>',
            '                </div>',
            '            </div>',
            '',
            '            <!-- STEP 2: TWO-FACTOR AUTHENTICATION WITH MOBILE QR CODE -->',
            '            <div id="authStep2Form" style="display:none;">',
            '                <!-- User Profile Staged Pill -->',
            '                <div style="text-align:center; margin-bottom:0.75rem;">',
            '                    <div id="auth2FAUserBadge" style="display:inline-flex; align-items:center; gap:0.6rem; padding:0.35rem 0.9rem; border-radius:999px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);">',
            '                        <div id="auth2FAAvatar" style="width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:700; color:#fff;">PA</div>',
            '                        <span id="auth2FAUserName" style="font-size:0.85rem; font-weight:700; color:#fff;">Prof. Nathaniel Baidoo</span>',
            '                        <span id="auth2FARole" style="font-size:0.7rem; color:#818cf8; font-weight:600;">SuperAdmin</span>',
            '                    </div>',
            '                </div>',
            '',
            '                <!-- 2FA Mode Navigation Pills -->',
            '                <div class="auth-2fa-mode-nav">',
            '                    <button type="button" class="auth-2fa-mode-pill active" id="btnModeQR" onclick="SMSAuth.toggle2FAMode(\'qr\')">',
            '                        <i class="ri-qr-code-line"></i> 1. Scan QR with Phone',
            '                    </button>',
            '                    <button type="button" class="auth-2fa-mode-pill" id="btnModeSim" onclick="SMSAuth.toggle2FAMode(\'simulator\')">',
            '                        <i class="ri-smartphone-line"></i> 2. Mobile Phone Live Screen',
            '                    </button>',
            '                    <button type="button" class="auth-2fa-mode-pill" id="btnModeSMS" onclick="SMSAuth.toggle2FAMode(\'sms\')">',
            '                        <i class="ri-message-3-line"></i> 3. SMS Direct',
            '                    </button>',
            '                </div>',
            '',
            '                <!-- MODE 1: SCANNABLE QR CODE -->',
            '                <div id="mode2FA_QR" class="qr-code-card">',
            '                    <div style="display:flex; justify-content:center; gap:0.4rem; margin-bottom:0.75rem;">',
            '                        <button type="button" id="btnQRTypeWeb" class="btn btn-sm btn-primary" onclick="SMSAuth.setQRTargetType(\'web\')" style="font-size:0.75rem; padding:0.25rem 0.65rem; border-radius:6px;">',
            '                            <i class="ri-camera-lens-line"></i> Phone Camera (Web)',
            '                        </button>',
            '                        <button type="button" id="btnQRTypeTOTP" class="btn btn-sm btn-secondary" onclick="SMSAuth.setQRTargetType(\'totp\')" style="font-size:0.75rem; padding:0.25rem 0.65rem; border-radius:6px;">',
            '                            <i class="ri-shield-keyhole-line"></i> Authenticator App',
            '                        </button>',
            '                    </div>',
            '                    <div class="qr-wrapper-frame">',
            '                        <div class="qr-scanline"></div>',
            '                        <div id="authQRCodeContainer" style="width:176px; height:176px; display:flex; align-items:center; justify-content:center;">',
            '                            <!-- Dynamically generated QR Code renders here -->',
            '                        </div>',
            '                    </div>',
            '                    <div class="qr-instruction-steps">',
            '                        <div style="font-weight:700; color:#38bdf8; margin-bottom:2px;"><i class="ri-camera-lens-line"></i> Authenticate with your mobile phone:</div>',
            '                        <div id="qrInstructionText">1. Point your <strong>phone camera</strong> at the QR code to open your mobile security portal.</div>',
            '                        <div>2. View your live 6-digit rotating code or tap <strong>Approve Session</strong>.</div>',
            '                        <div>3. Enter the 6 digits below to complete login.</div>',
            '                    </div>',
            '                    <div style="display:flex; flex-wrap:wrap; gap:0.4rem; justify-content:center; width:100%;">',
            '                        <button type="button" class="btn btn-secondary btn-sm" onclick="SMSAuth.openMobileCompanionWindow()" title="Open a companion mobile browser window" style="font-size:0.75rem; padding:0.35rem 0.65rem;">',
            '                            <i class="ri-external-link-line"></i> Open Mobile Portal Screen',
            '                        </button>',
            '                        <button type="button" class="btn btn-secondary btn-sm" onclick="SMSAuth.sendMobileSMSCode()" style="font-size:0.75rem; padding:0.35rem 0.65rem;">',
            '                            <i class="ri-smartphone-line"></i> Send Code via SMS',
            '                        </button>',
            '                        <button type="button" class="btn btn-outline btn-sm" onclick="SMSAuth.toggleSecretDisplay()" style="font-size:0.75rem; padding:0.35rem 0.65rem;">',
            '                            <i class="ri-key-line"></i> Manual Secret Key',
            '                        </button>',
            '                    </div>',
            '                    <div id="auth2FAManualSecretWrap" style="display:none; margin-top:0.5rem; font-size:0.72rem; color:#94a3b8; font-family:monospace; background:rgba(0,0,0,0.3); padding:4px 8px; border-radius:6px;">',
            '                        Secret: <strong id="auth2FASecretDisplay" style="color:#a5b4fc;">JBSWY3DPEHPK3PXP</strong>',
            '                    </div>',
            '                </div>',
            '',
            '                <!-- MODE 2: SMARTPHONE LIVE SCREEN / SIMULATOR -->',
            '                <div id="mode2FA_Simulator" style="display:none;">',
            '                    <div class="phone-simulator-wrapper">',
            '                        <div class="phone-notch"><div class="phone-speaker"></div></div>',
            '                        <div class="phone-screen">',
            '                            <div class="phone-status-bar">',
            '                                <span><i class="ri-signal-tower-fill"></i> MTN 5G</span>',
            '                                <span id="phoneSimClock">8:30 AM</span>',
            '                                <span>100% <i class="ri-battery-fill" style="color:#10b981;"></i></span>',
            '                            </div>',
            '                            <div class="phone-notif-banner">',
            '                                <div style="display:flex; align-items:center; gap:4px; font-size:0.65rem; color:#818cf8; font-weight:700;">',
            '                                    <i class="ri-shield-keyhole-fill"></i> PROF~BAIDOO SMS SECURITY',
            '                                </div>',
            '                                <div style="font-size:0.68rem; color:#cbd5e1; margin-top:2px;">',
            '                                    Your 6-digit authentication code is: <strong id="phoneSimNotifCode" style="color:#38bdf8;">------</strong>',
            '                                </div>',
            '                            </div>',
            '                            <div style="font-size:0.7rem; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px;">Mobile Authenticator Session</div>',
            '                            <div class="phone-code-display" id="phoneSimCode">------</div>',
            '                            <div style="font-size:0.72rem; color:#f59e0b; margin-bottom:6px;" id="phoneSimTimer">',
            '                                <i class="ri-time-line"></i> 30s remaining',
            '                            </div>',
            '                            <button type="button" class="phone-action-btn phone-btn-approve" onclick="SMSAuth.simulatePhoneApproval()">',
            '                                <i class="ri-checkbox-circle-fill"></i> ⚡ One-Tap Push Approve PC Login',
            '                            </button>',
            '                            <button type="button" class="phone-action-btn phone-btn-copy" onclick="SMSAuth.autoFillTOTPCode()">',
            '                                <i class="ri-magic-line"></i> Auto-Fill Code into PC Boxes',
            '                            </button>',
            '                        </div>',
            '                    </div>',
            '                </div>',
            '',
            '                <!-- MODE 3: SMS DIRECT DISPATCH -->',
            '                <div id="mode2FA_SMS" style="display:none;">',
            '                    <div class="sms-dispatch-card">',
            '                        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.5rem;">',
            '                            <span style="font-size:0.8rem; font-weight:700; color:#fff;"><i class="ri-message-3-line" style="color:#10b981;"></i> SMS Gateway Dispatch</span>',
            '                            <span class="secure-chip" style="font-size:0.65rem; color:#10b981; background:rgba(16,185,129,0.1); padding:2px 6px; border-radius:4px;">Active Telecomm Gateway</span>',
            '                        </div>',
            '                        <p style="font-size:0.75rem; color:#94a3b8; line-height:1.4; margin-bottom:0.6rem;">',
            '                            Dispatches an instant single-use authentication code to your registered mobile device: <strong id="auth2FASMSPhoneTarget" style="color:#38bdf8;">+233 XX XXX XXXX</strong>',
            '                        </p>',
            '                        <button type="button" class="btn btn-primary-gradient" onclick="SMSAuth.sendMobileSMSCode()" style="width:100%; justify-content:center; padding:0.5rem; font-size:0.82rem;">',
            '                            <i class="ri-send-plane-fill"></i> Dispatch SMS Authentication Code Now',
            '                        </button>',
            '                        <div id="smsTerminalLog" style="display:none; margin-top:0.6rem; padding:0.5rem; background:rgba(0,0,0,0.4); border-radius:8px; font-family:monospace; font-size:0.7rem; color:#a5b4fc; max-height:80px; overflow-y:auto;"></div>',
            '                    </div>',
            '                </div>',
            '',
            '                <!-- PC CODE INPUT FORM -->',
            '                <form id="formAuthStep2" onsubmit="event.preventDefault(); SMSAuth.handleStep2Submit();">',
            '                    <label class="form-label" style="text-align:center; display:block; margin-bottom:0.3rem;">Enter 6-Digit Code Received on Mobile Phone</label>',
            '                    <div class="totp-input-group">',
            '                        <input type="text" maxlength="1" class="totp-digit" id="totpD1" autofocus inputmode="numeric">',
            '                        <input type="text" maxlength="1" class="totp-digit" id="totpD2" inputmode="numeric">',
            '                        <input type="text" maxlength="1" class="totp-digit" id="totpD3" inputmode="numeric">',
            '                        <input type="text" maxlength="1" class="totp-digit" id="totpD4" inputmode="numeric">',
            '                        <input type="text" maxlength="1" class="totp-digit" id="totpD5" inputmode="numeric">',
            '                        <input type="text" maxlength="1" class="totp-digit" id="totpD6" inputmode="numeric">',
            '                    </div>',
            '                    <button type="submit" class="btn-primary-gradient" style="width:100%; justify-content:center; padding:0.65rem; margin-bottom:0.65rem;">',
            '                        <i class="ri-shield-check-line"></i> Verify Mobile Code & Access System',
            '                    </button>',
            '                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">',
            '                        <button type="button" class="btn btn-outline btn-sm" onclick="SMSAuth.switchBackToStep1()">',
            '                            <i class="ri-arrow-left-line"></i> Return to Sign In / Sign Up',
            '                        </button>',
            '                        <button type="button" class="btn btn-outline btn-sm" onclick="SMSAuth.switchToBackupCodeForm()" style="color:#f59e0b; border-color:rgba(245,158,11,0.4);">',
            '                            <i class="ri-key-2-line"></i> Use Auth Backup Code',
            '                        </button>',
            '                    </div>',
            '                </form>',
            '            </div>',
            '',
            '            <!-- STEP 2B: EMERGENCY AUTH BACKUP CODE REDEMPTION -->',
            '            <div id="authStepBackupForm" style="display:none;">',
            '                <div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); border-radius:12px; padding:0.9rem; margin-bottom:1.25rem;">',
            '                    <div style="font-weight:700; color:#f59e0b; font-size:0.85rem; margin-bottom:0.25rem; display:flex; align-items:center; gap:0.4rem;">',
            '                        <i class="ri-alert-line"></i> Emergency Single-Use Recovery',
            '                    </div>',
            '                    <p style="font-size:0.75rem; color:#cbd5e1; line-height:1.4;">Each backup code is single-use. Once redeemed, it will be burned and permanently invalidated.</p>',
            '                </div>',
            '                <form id="formAuthBackup" onsubmit="event.preventDefault(); SMSAuth.handleBackupSubmit();">',
            '                    <div class="auth-field" style="margin-bottom:1.25rem;">',
            '                        <label class="auth-label" for="authInputBackupCode">8-Character Auth Backup Code <span class="required-dot">*</span></label>',
            '                        <div class="auth-input-box">',
            '                            <i class="ri-key-2-line auth-lead-icon"></i>',
            '                            <input type="text" id="authInputBackupCode" class="auth-input" placeholder="e.g. XRUX-RH59" maxlength="9" style="font-family:monospace; font-size:1.1rem; font-weight:700; text-transform:uppercase; letter-spacing:2px;" required>',
            '                        </div>',
            '                    </div>',
            '                    <div id="authDemoBackupCodesHelp" style="margin-bottom:1.25rem; font-size:0.75rem; color:#94a3b8;">',
            '                    </div>',
            '                    <button type="submit" class="btn-primary-gradient" style="width:100%; justify-content:center; padding:0.85rem; margin-bottom:1rem;">',
            '                        <i class="ri-login-box-line"></i> Redeem Backup Code & Sign In',
            '                    </button>',
            '                    <button type="button" class="btn btn-outline btn-sm" onclick="SMSAuth.switchToTOTPForm()" style="width:100%;">',
            '                        <i class="ri-arrow-left-line"></i> Return to QR Code & Mobile 2FA',
            '                    </button>',
            '                </form>',
            '            </div>',
            '        </div>',
            '    </div>',
            '</div>',
            '',
            '<!-- MODAL: EMERGENCY AUTH BACKUP CODES MANAGER -->',
            '<div class="modal-overlay" id="modalAuthBackupManager">',
            '    <div class="modal-container modal-md">',
            '        <div class="modal-header">',
            '            <div class="modal-title"><i class="ri-key-2-line"></i> Emergency Auth Backup Codes</div>',
            '            <button class="btn-close-modal" data-modal="modalAuthBackupManager"><i class="ri-close-line"></i></button>',
            '        </div>',
            '        <div class="modal-body">',
            '            <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.4; margin-bottom:1rem;">',
            '                Keep these emergency backup codes in a safe place. If you lose access to your mobile phone authenticator, each code can be used exactly once to log in.',
            '            </p>',
            '            <div class="backup-codes-grid" id="modalBackupCodesList"></div>',
            '            <div style="display:flex; gap:0.5rem; margin-top:1rem;">',
            '                <button type="button" class="btn btn-secondary btn-sm" onclick="SMSAuth.copyBackupCodesToClipboard()">',
            '                    <i class="ri-file-copy-line"></i> Copy All Codes',
            '                </button>',
            '                <button type="button" class="btn btn-secondary btn-sm" onclick="SMSAuth.downloadBackupCodesTxt()">',
            '                    <i class="ri-download-2-line"></i> Download TXT',
            '                </button>',
            '                <button type="button" class="btn btn-outline btn-sm" onclick="SMSAuth.regenerateBackupCodes()" style="margin-left:auto; color:#ef4444; border-color:rgba(239,68,68,0.4);">',
            '                    <i class="ri-refresh-line"></i> Regenerate New Codes',
            '                </button>',
            '            </div>',
            '        </div>',
            '        <div class="modal-footer">',
            '            <button type="button" class="btn btn-outline" data-modal="modalAuthBackupManager">Close</button>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join("\n");
        document.body.appendChild(container);
    }

    bindAuthEvents() {                                                          // Method: Configures digit inputs and keyboard navigation
        for (let i = 1; i <= 6; i++) {
            const input = document.getElementById("totpD" + i);
            if (!input) continue;
            input.addEventListener("input", (e) => {
                if (e.target.value.length === 1 && i < 6) {
                    const next = document.getElementById("totpD" + (i + 1));
                    if (next) next.focus();
                }
            });
            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && !e.target.value && i > 1) {
                    const prev = document.getElementById("totpD" + (i - 1));
                    if (prev) { prev.focus(); prev.value = ""; }
                }
            });
            input.addEventListener("paste", (e) => {
                e.preventDefault();
                const pasted = (e.clipboardData.getData("text") || "").replace(/[^0-9]/g, "").slice(0, 6);
                if (pasted.length === 6) {
                    for (let j = 0; j < 6; j++) {
                        const el = document.getElementById("totpD" + (j + 1));
                        if (el) el.value = pasted[j];
                    }
                    document.getElementById("totpD6")?.focus();
                }
            });
        }
    }

    // Toggle between Sign In and Sign Up tabs
    toggleAuthTab(tab) {
        this.activeAuthTab = tab;
        const signInTab = document.getElementById("tabBtnSignIn");
        const signUpTab = document.getElementById("tabBtnSignUp");
        const signInPanel = document.getElementById("authSignInPanel");
        const signUpPanel = document.getElementById("authSignUpPanel");
        const title = document.getElementById("authScreenTitle");
        const sub = document.getElementById("authScreenSub");

        if (tab === "signin") {
            signInTab?.classList.add("active");
            signUpTab?.classList.remove("active");
            if (signInPanel) signInPanel.style.display = "block";
            if (signUpPanel) signUpPanel.style.display = "none";
            if (title) title.textContent = "User Sign In";
            if (sub) sub.textContent = "Sign in to access Prof~Baidoo Basic School OS";
            document.getElementById("authInputIdentifier")?.focus();
        } else {
            signInTab?.classList.remove("active");
            signUpTab?.classList.add("active");
            if (signInPanel) signInPanel.style.display = "none";
            if (signUpPanel) signUpPanel.style.display = "block";
            if (title) title.textContent = "Create New Account";
            if (sub) sub.textContent = "Sign up as Teacher, Student/Parent, Bursar or Administrator";
            document.getElementById("signupFullName")?.focus();
        }
    }

    // Toggle 2FA Screen Modes: QR vs Phone Simulator vs SMS
    toggle2FAMode(mode) {
        this.active2FAMode = mode;
        const modes = ["qr", "simulator", "sms"];
        modes.forEach(m => {
            const btn = document.getElementById("btnMode" + (m === "qr" ? "QR" : m === "simulator" ? "Sim" : "SMS"));
            const panel = document.getElementById("mode2FA_" + (m === "qr" ? "QR" : m === "simulator" ? "Simulator" : "SMS"));
            if (m === mode) {
                btn?.classList.add("active");
                if (panel) panel.style.display = (m === "qr" ? "flex" : "block");
            } else {
                btn?.classList.remove("active");
                if (panel) panel.style.display = "none";
            }
        });
    }

    // Toggle Password Visibility Eye
    togglePasswordVisibility(inputId, btnEl) {
        const input = document.getElementById(inputId);
        if (!input) return;
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        if (btnEl) {
            btnEl.innerHTML = isPassword ? '<i class="ri-eye-off-line"></i>' : '<i class="ri-eye-line"></i>';
        }
    }

    // Real-time password strength meter
    handlePasswordStrength(val) {
        const fill = document.getElementById("signupStrengthFill");
        const text = document.getElementById("signupStrengthText");
        if (!fill || !text) return;
        let score = 0;
        if (val.length >= 6) score += 25;
        if (val.length >= 10) score += 25;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score += 25;
        if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) score += 25;

        fill.style.width = score + "%";
        if (score <= 25) {
            fill.style.background = "#ef4444";
            text.textContent = "Weak (Minimum 6 characters)";
            text.style.color = "#ef4444";
        } else if (score <= 50) {
            fill.style.background = "#f59e0b";
            text.textContent = "Fair (Add numbers & mixed cases)";
            text.style.color = "#f59e0b";
        } else if (score <= 75) {
            fill.style.background = "#3b82f6";
            text.textContent = "Good Strength";
            text.style.color = "#3b82f6";
        } else {
            fill.style.background = "#10b981";
            text.textContent = "Strong & Secure";
            text.style.color = "#10b981";
        }
    }

    // Handle role change on signup
    handleRoleSelectionChange(role) {
        const classGroup = document.getElementById("signupClassGroup");
        if (!classGroup) return;
        if (role === "SuperAdmin" || role === "Accountant") {
            classGroup.style.display = "none";
        } else {
            classGroup.style.display = "block";
        }
    }

    // Handle Sign Up Form Submission
    handleSignUpSubmit() {
        const fullName = (document.getElementById("signupFullName")?.value || "").trim();
        const username = (document.getElementById("signupUsername")?.value || "").trim().toLowerCase();
        const email = (document.getElementById("signupEmail")?.value || "").trim().toLowerCase();
        const phone = (document.getElementById("signupPhone")?.value || "").trim();
        const role = document.getElementById("signupRole")?.value || "Teacher";
        const assignedClass = document.getElementById("signupClass")?.value || "Primary 1";
        const password = document.getElementById("signupPassword")?.value || "";
        const confirmPassword = document.getElementById("signupConfirmPassword")?.value || "";

        if (!fullName || !username || !email || !phone || !password) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast("Please fill in all mandatory sign-up fields.", "warning");
            } else alert("Please fill in all mandatory sign-up fields.");
            return;
        }

        if (password.length < 6) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast("Password must be at least 6 characters.", "warning");
            } else alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast("Passwords do not match. Please re-enter.", "error");
            } else alert("Passwords do not match. Please re-enter.");
            return;
        }

        const result = this.registerNewUser({
            fullName,
            username,
            email,
            phone,
            password,
            role,
            assignedClass
        });

        if (!result.success) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast(result.reason, "error");
            } else alert(result.reason);
            return;
        }

        // Successfully created user account: stage into pending2FAUser and switch to 2FA / QR Mobile Verification
        this.pending2FAUser = result.user;
        const badgeName = document.getElementById("auth2FAUserName");
        const badgeRole = document.getElementById("auth2FARole");
        const badgeAvatar = document.getElementById("auth2FAAvatar");
        if (badgeName) badgeName.textContent = result.user.fullName;
        if (badgeRole) badgeRole.textContent = result.user.roleTitle;
        if (badgeAvatar) {
            badgeAvatar.textContent = result.user.avatarText;
            badgeAvatar.style.background = result.user.avatarBg;
        }

        if (window.app && typeof window.app.showToast === "function") {
            window.app.showToast("Account created for " + result.user.fullName + "! Please scan the QR code with your mobile phone to complete authentication.", "success");
        }

        this.switchToTOTPForm();
    }

    fillDemoAccount(username, password) {                                       // Method: Helper to 1-click populate demo accounts
        this.toggleAuthTab("signin");
        const idInput = document.getElementById("authInputIdentifier");
        const pwInput = document.getElementById("authInputPassword");
        if (idInput) idInput.value = username;
        if (pwInput) pwInput.value = password;
    }

    showLoginOverlay() {                                                        // Method: Displays fullscreen login overlay
        const overlay = document.getElementById("authScreenOverlay");
        if (overlay) overlay.classList.remove("hidden");
        this.switchBackToStep1();
    }

    hideLoginOverlay() {                                                        // Method: Hides fullscreen login overlay
        const overlay = document.getElementById("authScreenOverlay");
        if (overlay) overlay.classList.add("hidden");
        if (this.totpTickerInterval) {
            clearInterval(this.totpTickerInterval);
            this.totpTickerInterval = null;
        }
    }

    switchBackToStep1() {                                                       // Method: Transitions auth card back to Step 1
        const s1 = document.getElementById("authStep1Form"); if (s1) s1.style.display = "block";
        const s2 = document.getElementById("authStep2Form"); if (s2) s2.style.display = "none";
        const sb = document.getElementById("authStepBackupForm"); if (sb) sb.style.display = "none";
        const title = document.getElementById("authScreenTitle"); if (title) title.textContent = this.activeAuthTab === "signin" ? "User Sign In" : "Create New Account";
        const sub = document.getElementById("authScreenSub"); if (sub) sub.textContent = "Verify your credentials & authenticate with mobile QR code";
        const d1 = document.getElementById("authDotStep1"); if (d1) d1.classList.add("active");
        const d2 = document.getElementById("authDotStep2"); if (d2) d2.classList.remove("active");
        this.pending2FAUser = null;
        if (this.totpTickerInterval) clearInterval(this.totpTickerInterval);
    }

    // Dynamic QR Code Rendering into Canvas / Container
    renderQRCode(user) {
        const qrContainer = document.getElementById("authQRCodeContainer");
        if (!qrContainer || !user) return;
        qrContainer.innerHTML = "";

        let payload = "";
        if (this.qrTargetType === "web") {
            let base = "mobile-auth.html";
            if (typeof window !== "undefined" && window.location && window.location.origin && window.location.origin !== "null" && !window.location.origin.startsWith("file")) {
                const pathStr = window.location.pathname || "";
                const lastSlash = pathStr.lastIndexOf('/');
                const basePath = lastSlash > 0 ? pathStr.substring(0, lastSlash) : "";
                base = window.location.origin + basePath + "/mobile-auth.html";
            }
            payload = base + "?user=" + encodeURIComponent(user.username) +
                "&secret=" + encodeURIComponent(user.twoFactorSecret) +
                "&name=" + encodeURIComponent(user.fullName) +
                "&role=" + encodeURIComponent(user.roleTitle || user.role);
        } else {
            payload = "otpauth://totp/ProfBaidooEduComplex:" + encodeURIComponent(user.username) +
                "?secret=" + user.twoFactorSecret +
                "&issuer=ProfBaidooEduComplex&digits=6&period=30";
        }

        if (typeof QRCode !== "undefined") {
            try {
                this.qrCodeInstance = new QRCode(qrContainer, {
                    text: payload,
                    width: 176,
                    height: 176,
                    colorDark: "#090e1a",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.M
                });
                return;
            } catch (err) {
                console.warn("QRCode rendering error, falling back to SVG", err);
            }
        }
        
        // Pure SVG / Vector Fallback if QRCode library is loading
        qrContainer.innerHTML = '<div style="text-align:center; padding:10px;"><i class="ri-qr-code-fill" style="font-size:5rem; color:#090e1a;"></i><div style="font-size:0.7rem; color:#64748b; font-weight:700;">Scan with Phone Camera</div></div>';
    }

    setQRTargetType(type) {
        this.qrTargetType = type;
        const btnWeb = document.getElementById("btnQRTypeWeb");
        const btnTOTP = document.getElementById("btnQRTypeTOTP");
        if (btnWeb) btnWeb.className = type === "web" ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
        if (btnTOTP) btnTOTP.className = type === "totp" ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
        const instr = document.getElementById("qrInstructionText");
        if (instr) {
            if (type === "web") {
                instr.innerHTML = "1. Point your <strong>phone camera</strong> at the QR code to open your mobile security portal.";
            } else {
                instr.innerHTML = "1. Scan with <strong>Google Authenticator</strong>, <strong>Microsoft Authenticator</strong>, or <strong>Apple Passwords</strong>.";
            }
        }
        if (this.pending2FAUser) {
            this.renderQRCode(this.pending2FAUser);
        }
    }

    switchToTOTPForm() {                                                        // Method: Transitions auth card to 2FA Step 2A
        const s1 = document.getElementById("authStep1Form"); if (s1) s1.style.display = "none";
        const s2 = document.getElementById("authStep2Form"); if (s2) s2.style.display = "block";
        const sb = document.getElementById("authStepBackupForm"); if (sb) sb.style.display = "none";
        const title = document.getElementById("authScreenTitle"); if (title) title.textContent = "Mobile Authentication Code";
        const sub = document.getElementById("authScreenSub"); if (sub) sub.textContent = "Scan the QR code with your mobile phone to receive your verification code";
        const d1 = document.getElementById("authDotStep1"); if (d1) d1.classList.remove("active");
        const d2 = document.getElementById("authDotStep2"); if (d2) d2.classList.add("active");

        if (this.pending2FAUser) {
            this.renderQRCode(this.pending2FAUser);
            const secretEl = document.getElementById("auth2FASecretDisplay");
            if (secretEl) secretEl.textContent = this.pending2FAUser.twoFactorSecret;
            const phoneEl = document.getElementById("auth2FASMSPhoneTarget");
            if (phoneEl) phoneEl.textContent = this.pending2FAUser.phone || "+233 24 000 0000";
        }

        for (let i = 1; i <= 6; i++) {
            const el = document.getElementById("totpD" + i);
            if (el) el.value = "";
        }
        document.getElementById("totpD1")?.focus();
        this.toggle2FAMode("qr");
        this.startTOTPTicker();
    }

    switchToBackupCodeForm() {                                                  // Method: Transitions auth card to Auth Backup Step 2B
        const s1 = document.getElementById("authStep1Form"); if (s1) s1.style.display = "none";
        const s2 = document.getElementById("authStep2Form"); if (s2) s2.style.display = "none";
        const sb = document.getElementById("authStepBackupForm"); if (sb) sb.style.display = "block";
        const title = document.getElementById("authScreenTitle"); if (title) title.textContent = "Emergency Auth Backup";
        const sub = document.getElementById("authScreenSub"); if (sub) sub.textContent = "Redeem a single-use emergency backup recovery code";
        const input = document.getElementById("authInputBackupCode");
        if (input) { input.value = ""; input.focus(); }
        const helpBox = document.getElementById("authDemoBackupCodesHelp");
        if (helpBox && this.pending2FAUser) {
            const available = (this.pending2FAUser.backupCodes || []).filter(c => !c.used);
            if (available.length > 0) {
                helpBox.innerHTML = "Available test codes for " + this.pending2FAUser.username + ": " +
                    available.slice(0, 3).map(c => "<code style='background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; margin-right:4px; cursor:pointer;' onclick=\"document.getElementById('authInputBackupCode').value='" + c.code + "'\">" + c.code + "</code>").join("");
            } else {
                helpBox.innerHTML = "<span style='color:#ef4444;'>No remaining backup codes on this account.</span>";
            }
        }
    }

    toggleSecretDisplay() {
        const wrap = document.getElementById("auth2FAManualSecretWrap");
        if (wrap) {
            wrap.style.display = wrap.style.display === "none" ? "block" : "none";
        }
    }

    // Opens standalone companion mobile web portal in a pop-up window formatted as a phone
    openMobileCompanionWindow() {
        if (!this.pending2FAUser) return;
        const u = this.pending2FAUser;
        const url = "mobile-auth.html?user=" + encodeURIComponent(u.username) +
            "&secret=" + encodeURIComponent(u.twoFactorSecret) +
            "&name=" + encodeURIComponent(u.fullName) +
            "&role=" + encodeURIComponent(u.roleTitle || u.role);
        window.open(url, "ProfBaidooMobileAuth", "width=380,height=720,menubar=no,toolbar=no,location=no,status=no,resizable=yes");
        if (window.app && typeof window.app.showToast === "function") {
            window.app.showToast("📱 Mobile companion screen opened! You can view and approve the session directly.", "info");
        }
    }

    // Dispatches a simulated SMS code to the user's mobile phone
    sendMobileSMSCode() {
        if (!this.pending2FAUser) return;
        const user = this.pending2FAUser;
        const currentCode = generateTOTPCode(user.twoFactorSecret, 0);
        this.lastSMSCode = currentCode;

        // Show SMS Dispatch log
        const term = document.getElementById("smsTerminalLog");
        if (term) {
            term.style.display = "block";
            term.innerHTML = "<strong>&gt; Gateway:</strong> Connecting to Vodafone/MTN SMS Center...<br>" +
                "<strong>&gt; Destination:</strong> " + (user.phone || "+233 24 000 0000") + "<br>" +
                "<strong>&gt; Payload:</strong> [PROF~BAIDOO SMS] Your 2FA security code is " + currentCode + ". Valid 30s.<br>" +
                "<strong>&gt; Status:</strong> 200 OK — Delivered to handset.";
        }

        // Update phone simulator notification banner
        const notifCode = document.getElementById("phoneSimNotifCode");
        if (notifCode) notifCode.textContent = currentCode;

        if (window.app && typeof window.app.showToast === "function") {
            window.app.showToast("📨 SMS Dispatched to " + (user.phone || "mobile phone") + "! Code: " + currentCode, "success");
        }
    }

    // 1-Tap Mobile Push Approval Simulator
    simulatePhoneApproval() {
        if (!this.pending2FAUser) return;
        this.autoFillTOTPCode();
        if (window.app && typeof window.app.showToast === "function") {
            window.app.showToast("⚡ Mobile Push Approved! Accessing School OS...", "success");
        }
        setTimeout(() => {
            this.handleStep2Submit();
        }, 300);
    }

    startTOTPTicker() {                                                         // Method: Drives the live 30s TOTP countdown & simulator
        if (this.totpTickerInterval) clearInterval(this.totpTickerInterval);
        const updateTick = () => {
            if (!this.pending2FAUser) return;
            const secret = this.pending2FAUser.twoFactorSecret;
            const nowSec = Math.floor(Date.now() / 1000);
            const secondsRemaining = 30 - (nowSec % 30);
            const currentCode = generateTOTPCode(secret, 0);

            // Update Phone Simulator Displays
            const phoneCodeEl = document.getElementById("phoneSimCode");
            const phoneNotifEl = document.getElementById("phoneSimNotifCode");
            const phoneTimerEl = document.getElementById("phoneSimTimer");
            const phoneClockEl = document.getElementById("phoneSimClock");

            if (phoneCodeEl) phoneCodeEl.textContent = currentCode;
            if (phoneNotifEl && phoneNotifEl.textContent === "------") phoneNotifEl.textContent = currentCode;
            if (phoneTimerEl) phoneTimerEl.innerHTML = "<i class='ri-time-line'></i> " + secondsRemaining + "s remaining";
            if (phoneClockEl) {
                const now = new Date();
                phoneClockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        };
        updateTick();
        this.totpTickerInterval = setInterval(updateTick, 1000);
    }

    autoFillTOTPCode() {                                                        // Method: Auto-populates live TOTP simulator code into inputs
        if (!this.pending2FAUser) return;
        const code = generateTOTPCode(this.pending2FAUser.twoFactorSecret, 0);
        for (let i = 0; i < 6; i++) {
            const el = document.getElementById("totpD" + (i + 1));
            if (el) el.value = code[i];
        }
        document.getElementById("totpD6")?.focus();
    }

    handleStep1Submit() {                                                       // Method: Handles Step 1 form submission
        const idInput = document.getElementById("authInputIdentifier");
        const pwInput = document.getElementById("authInputPassword");
        const identifier = idInput ? idInput.value.trim() : "";
        const password = pwInput ? pwInput.value : "";
        const result = this.authenticateStep1(identifier, password);
        if (!result.success) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast(result.reason, "error");
            } else {
                alert(result.reason);
            }
            return;
        }
        const badgeName = document.getElementById("auth2FAUserName");
        const badgeRole = document.getElementById("auth2FARole");
        const badgeAvatar = document.getElementById("auth2FAAvatar");
        if (badgeName) badgeName.textContent = result.user.fullName;
        if (badgeRole) badgeRole.textContent = result.user.roleTitle;
        if (badgeAvatar) {
            badgeAvatar.textContent = result.user.avatarText;
            badgeAvatar.style.background = result.user.avatarBg;
        }
        this.switchToTOTPForm();
    }

    handleStep2Submit() {                                                       // Method: Handles Step 2A TOTP form submission
        let code = "";
        for (let i = 1; i <= 6; i++) {
            const el = document.getElementById("totpD" + i);
            code += (el ? el.value.trim() : "");
        }
        if (code.length !== 6) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast("Please enter all 6 digits of your authentication code.", "warning");
            }
            return;
        }
        const result = this.authenticateStep2TOTP(code);
        if (!result.success) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast(result.reason, "error");
            } else {
                alert(result.reason);
            }
            return;
        }
        this.completeLoginSuccess(result.user, "Mobile Phone QR / 2FA");
    }

    handleBackupSubmit() {                                                      // Method: Handles Step 2B Auth Backup form submission
        const input = document.getElementById("authInputBackupCode");
        const code = input ? input.value.trim() : "";
        if (!code) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast("Please enter an 8-character backup recovery code.", "warning");
            }
            return;
        }
        const result = this.authenticateStep2BackupCode(code);
        if (!result.success) {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast(result.reason, "error");
            } else {
                alert(result.reason);
            }
            return;
        }
        this.completeLoginSuccess(result.user, "Auth Backup Code (" + result.burnedCode + ")");
        if (window.app && typeof window.app.showToast === "function") {
            window.app.showToast("Emergency code redeemed! You have " + result.remaining + " backup codes remaining.", "warning");
        }
    }

    completeLoginSuccess(user, methodTitle) {                                   // Method: Common finalization after successful 2FA or backup
        this.hideLoginOverlay();
        this.updateActiveUserUI();
        if (window.app && typeof window.app.renderAllViews === "function") {
            window.app.renderAllViews();
        }
        if (window.app && typeof window.app.showToast === "function") {
            window.app.showToast("Welcome back, " + user.fullName + "! Authenticated via " + methodTitle + ".", "success");
        }
    }

    updateActiveUserUI() {                                                      // Method: Updates user identity card, role badges, and RLS banners
        const user = this.currentSession;
        if (!user) return;
        const sidebarName = document.getElementById("sidebarUserName");
        const sidebarAvatar = document.getElementById("sidebarUserAvatar");
        const sidebarRole = document.querySelector(".sidebar-footer .user-role");
        if (sidebarName) sidebarName.textContent = user.fullName;
        if (sidebarAvatar) {
            sidebarAvatar.textContent = user.avatarText;
            sidebarAvatar.style.background = user.avatarBg;
        }
        if (sidebarRole) {
            sidebarRole.innerHTML = user.roleTitle + "<span style='font-size:0.65rem; color:#818cf8; display:block;'>Scope: " + (user.rowScope.assignedClass || "All") + "</span>";
        }
        let rlsNavPill = document.getElementById("headerRLSPill");
        if (!rlsNavPill) {
            const headerRight = document.querySelector(".header-right");
            if (headerRight) {
                rlsNavPill = document.createElement("div");
                rlsNavPill.id = "headerRLSPill";
                rlsNavPill.className = "header-rls-wrapper";
                headerRight.insertBefore(rlsNavPill, headerRight.firstChild);
            }
        }
        if (rlsNavPill) {
            rlsNavPill.innerHTML = [
                '<div class="header-rls-pill-box">',
                '    <i class="ri-shield-user-line" style="color:#818cf8; font-size:0.9rem;"></i>',
                '    <span class="header-rls-role-label">RLS: ' + user.role + '</span>',
                '    <span class="header-rls-scope-tag">' + (user.rowScope.assignedClass || "Global") + '</span>',
                '    <select id="headerRoleSwitcherSelect" class="header-rls-switcher-select" onchange="SMSAuth.quickSwitchUser(this.value)">',
                '        <option value="admin" ' + (user.username === "admin" ? "selected" : "") + '>Prof. Baidoo (SuperAdmin - All Rows)</option>',
                '        <option value="teacher.grace" ' + (user.username === "teacher.grace" ? "selected" : "") + '>Madam Grace (Teacher - Primary 1 Rows)</option>',
                '        <option value="teacher.ebenezer" ' + (user.username === "teacher.ebenezer" ? "selected" : "") + '>Mr. Mensah (Teacher - Primary 2 Rows)</option>',
                '        <option value="bursar" ' + (user.username === "bursar" ? "selected" : "") + '>Mr. Boateng (Accountant - Billing Rows)</option>',
                '        <option value="std.kwame" ' + (user.username === "std.kwame" ? "selected" : "") + '>Kwame Mensah (Student - Own Row Only)</option>',
                (user.username.startsWith("usr_") || !["admin","teacher.grace","teacher.ebenezer","bursar","std.kwame"].includes(user.username)) ?
                    ('        <option value="' + user.username + '" selected>' + user.fullName + ' (' + user.role + ')</option>') : '',
                '    </select>',
                '    <button type="button" class="btn-icon" style="width:24px; height:24px; padding:0; font-size:0.8rem;" onclick="SMSAuth.openMobileCompanionWindow()" title="Open Mobile Companion Screen">',
                '        <i class="ri-smartphone-line" style="color:#38bdf8;"></i>',
                '    </button>',
                '    <button type="button" class="btn-icon" style="width:24px; height:24px; padding:0; font-size:0.8rem;" onclick="SMSAuth.openBackupManagerModal()" title="View & Manage Auth Backup Codes">',
                '        <i class="ri-key-2-line" style="color:#f59e0b;"></i>',
                '    </button>',
                '    <button type="button" class="btn-icon" style="width:24px; height:24px; padding:0; font-size:0.8rem;" onclick="SMSAuth.logout()" title="Logout of Session">',
                '        <i class="ri-logout-box-r-line" style="color:#ef4444;"></i>',
                '    </button>',
                '</div>'
            ].join("\n");
        }
        this.renderRowAuthorizationBanners();
    }

    renderRowAuthorizationBanners() {                                           // Method: Injects RLS status banners above data tables
        const user = this.currentSession;
        if (!user) return;
        const tableContainers = [
            { id: "studentsView", name: "Students Directory", table: "students" },
            { id: "attendanceView", name: "Daily Attendance", table: "attendance" },
            { id: "examsView", name: "Exams & Gradebook", table: "grades" },
            { id: "feesView", name: "Fees & Billing", table: "fees" }
        ];
        tableContainers.forEach(item => {
            const view = document.getElementById(item.id);
            if (!view) return;
            let banner = view.querySelector(".rls-banner");
            if (!banner) {
                banner = document.createElement("div");
                banner.className = "rls-banner";
                const header = view.querySelector(".view-header");
                if (header && header.nextSibling) {
                    view.insertBefore(banner, header.nextSibling);
                } else {
                    view.insertBefore(banner, view.firstChild);
                }
            }
            banner.innerHTML = [
                '<div class="rls-banner-left">',
                '    <i class="ri-shield-check-line" style="color:#10b981; font-size:1.1rem;"></i>',
                '    <span>Row-Level Authorization Active: <strong>' + user.roleTitle + '</strong></span>',
                '    <span class="rls-scope-tag">' + user.rowScope.description + '</span>',
                '</div>',
                '<div style="font-size:0.75rem; color:#94a3b8; display:flex; align-items:center; gap:0.5rem;">',
                '    <span>Scope: <code style="color:#a5b4fc;">' + (user.rowScope.assignedClass || user.rowScope.scopeType) + '</code></span>',
                '    <button class="btn btn-outline btn-sm" style="padding:0.2rem 0.5rem; font-size:0.7rem;" onclick="SMSAuth.openBackupManagerModal()">',
                '        <i class="ri-shield-flash-line"></i> Auth Backup',
                '    </button>',
                '</div>'
            ].join("\n");
        });
    }

    openBackupManagerModal() {                                                  // Method: Opens modal showing all single-use backup codes
        const user = this.currentSession;
        if (!user) return;
        const listContainer = document.getElementById("modalBackupCodesList");
        if (listContainer) {
            const codes = user.backupCodes || [];
            listContainer.innerHTML = codes.map((c, i) => [
                '<div class="backup-code-item ' + (c.used ? "used" : "") + '">',
                '    <span><i class="' + (c.used ? "ri-close-circle-line" : "ri-checkbox-circle-line") + '" style="color:' + (c.used ? "#ef4444" : "#10b981") + '; margin-right:4px;"></i> Code #' + (i + 1) + ": " + c.code + "</span>",
                '    <span style="font-size:0.7rem; color:' + (c.used ? "#ef4444" : "#10b981") + '; font-weight:700;">' + (c.used ? ("Burned (" + (c.usedAt || "Used") + ")") : "Available") + '</span>',
                '</div>'
            ].join("")).join("");
        }
        const modal = document.getElementById("modalAuthBackupManager");
        if (modal) modal.classList.add("active");
    }

    copyBackupCodesToClipboard() {                                              // Method: Copies all backup codes formatted to clipboard
        const user = this.currentSession;
        if (!user || !user.backupCodes) return;
        const text = "PROF~BAIDOO EDU SYSTEM - EMERGENCY AUTH BACKUP CODES\n" +
            "Account: " + user.fullName + " (" + user.username + ")\n" +
            "Generated: " + new Date().toLocaleString() + "\n\n" +
            user.backupCodes.map((c, i) => "#" + (i + 1) + ": " + c.code + " [" + (c.used ? "BURNED" : "AVAILABLE") + "]").join("\n");
        navigator.clipboard.writeText(text).then(() => {
            if (window.app && typeof window.app.showToast === "function") {
                window.app.showToast("Auth Backup Codes copied to clipboard!", "success");
            }
        });
    }

    downloadBackupCodesTxt() {                                                  // Method: Downloads backup codes as a plain text file
        const user = this.currentSession;
        if (!user || !user.backupCodes) return;
        const content = "==========================================================\n" +
            "PROF~BAIDOO'S EDU SYSTEM — EMERGENCY AUTH BACKUP CODES\n" +
            "==========================================================\n" +
            "User: " + user.fullName + " (" + user.username + ")\n" +
            "Role: " + user.roleTitle + "\n" +
            "Timestamp: " + new Date().toLocaleString() + "\n\n" +
            "IMPORTANT: Each of these single-use recovery codes allows logging into\n" +
            "the system when Two-Factor Authentication (2FA) is inaccessible.\n\n" +
            user.backupCodes.map((c, i) => "Code #" + (i + 1) + ": " + c.code + "  ->  Status: " + (c.used ? "CONSUMED/BURNED" : "ACTIVE/AVAILABLE")).join("\n") +
            "\n\n==========================================================\n";
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "ProfBaidoo_SMS_Auth_Backup_Codes_" + user.username + ".txt";
        link.click();
        URL.revokeObjectURL(link.href);
        if (window.app && typeof window.app.showToast === "function") {
            window.app.showToast("Downloaded emergency backup codes text file.", "success");
        }
    }

    regenerateBackupCodes() {                                                   // Method: Generates 8 fresh backup codes and burns old ones
        const user = this.currentSession;
        if (!user) return;
        if (!confirm("Are you sure you want to regenerate new Auth Backup Codes? All existing backup codes will be immediately invalidated.")) {
            return;
        }
        const newCodes = generateEmergencyBackupCodes(8);
        user.backupCodes = newCodes;
        this.saveUser(user);
        this.openBackupManagerModal();
        this.logSecurityEvent("BACKUP_CODES_REGENERATED",
            "User " + user.username + " regenerated 8 fresh emergency auth backup codes.");
        if (window.app && typeof window.app.showToast === "function") {
            window.app.showToast("Successfully generated 8 fresh Auth Backup Codes!", "success");
        }
    }
}                                                                               // End: SMSAuthManager class

// 9. INSTANTIATE AND EXPOSE GLOBAL AUTH ENGINE INSTANCE                        // Section: Global Instance
const SMSAuth = new SMSAuthManager();                                           // Instance: Create singleton authentication manager
window.SMSAuth = SMSAuth;                                                       // Global: Bind singleton to window global scope

// Initialize Authentication System upon DOM Readiness                          // Section: Lifecycle Hook
document.addEventListener("DOMContentLoaded", () => {                           // Event: Wait for DOM readiness
    SMSAuth.initUI();                                                           // Execute: Initialize security UI, overlays, and event handlers
});                                                                             // End: DOMContentLoaded listener
// ============================================================================ // End of File
