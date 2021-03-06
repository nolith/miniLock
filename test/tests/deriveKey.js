// Key derivation test.
QUnit.asyncTest('deriveKey', function(assert) {
	'use strict';
	var passphrase = 'This passphrase is supposed to be good enough for miniLock. :-)'
	miniLock.crypto.getKeyPair(passphrase, 'miniLockScrypt..')
	assert.deepEqual(miniLock.session.keyPairReady, false, 'keyPairReady starts as false')
	assert.deepEqual(Object.keys(miniLock.session.keys).length, 0, 'sessionKeys is empty')
	var keyInterval = setInterval(function() {
		if (miniLock.session.keyPairReady) {
			clearInterval(keyInterval)
			assert.deepEqual(Object.keys(miniLock.session.keys).length, 2, 'sessionKeys is filled')
			assert.deepEqual(miniLock.session.keyPairReady, true, 'keyPairReady set to true')
			assert.deepEqual(typeof(miniLock.session.keys), 'object', 'Type check')
			assert.deepEqual(typeof(miniLock.session.keys.publicKey), 'object', 'Public key type check')
			assert.deepEqual(typeof(miniLock.session.keys.secretKey), 'object', 'Secret key type check')
			assert.deepEqual(miniLock.session.keys.publicKey.length, 32, 'Public key length')
			assert.deepEqual(miniLock.session.keys.secretKey.length, 32, 'Secret key length')
			assert.deepEqual(
				Base58.encode(miniLock.session.keys.publicKey),
				'EWVHJniXUFNBC9RmXe45c8bqgiAEDoL3Qojy2hKt4c4e',
				'Public key Base58 representation'
			)
			assert.deepEqual(
				nacl.util.encodeBase64(miniLock.session.keys.secretKey),
				'6rcsdGAhF2rIltBRL+gwvQTQT7JMyei/d2JDrWoo0yw=',
				'Secret key Base64 representation'
			)
			assert.deepEqual(
				miniLock.crypto.getMiniLockID(miniLock.session.keys.publicKey),
				'22d9pyWnHVGQTzCCKYEYbL4YmtGfjMVV3e5JeJUzLNum8A',
				'miniLock ID from public key'
			)
			QUnit.start()
		}
	}, 500)
})
