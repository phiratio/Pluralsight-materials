# Jared DeMott <jdemott@vdalabs.com>
# tls protocol:
# client_hello -->
#   <-- server_hello_certificate
#   <-- server_key_exchange
# client_key_exchange_change_cipher_handshake -->
#   <-- server_change_cipher_handshake

from sulley import *

s_initialize("client_hello")
if s_block_start("all_client_hello"):
    s_random(0x16, 1, 1, name="content_type")
    s_random("\x03\x01", 2, 2)

    s_size("handshake", 2, fuzzable=True)
    if s_block_start("handshake"):
        s_random(0x01, 1, 1, name="handshake_type")
    s_block_end("handshake")
    
    s_size("handshake_client_hello", 3, fuzzable=True)
    if s_block_start("handshake_client_hello"):
        s_random("\x03\x01", 2, 2)
        s_random("\x00\x00\x56\x03", 4, 4, name="time")
        s_static("A" * 20, name="random_data")
        s_random(0x00, 1, 1, name="session_id_len")

        s_size("cipher_suites", 2, fuzzable=True)
        if s_block_start("cipher_suites"):
            s_static("\x00\x39")
            s_static("\x00\x38")
            s_static("\x00\x35")
            s_static("\x00\x33")
            s_static("\x00\x32")
            s_static("\x00\x39")
            s_static("\x00\x04")
            s_static("\x00\x05")
            s_static("\x00\x2f")
            s_static("\x00\x16")
            s_static("\x00\x13")
            s_static("\xfe\xff")
            s_static("\x00\x0a")
            s_string("\x00\x00")
            s_string("alot")
        s_block_end("cipher_suites")

        s_size("compression")
        if s_block_start("compression"):
            s_string("\x00")
        s_block_end()
        
        s_size("extensions", 2)
        if s_block_start("extensions"):
            #for extensions
            #sometimes do this
            #s_lego("extension_block", "\x00\x0a", "\x00\x06\x00\x17\x00\x18\x00\x19")
            #s_lego("extension_block", "\x00\x0b", "\x01\x00")
            #sometimes build a random number of extensions
            if s_block_start("extension_block"):
                s_random("\x00\x0a", 2, 2, name="extension_type")
                s_size("extension_data", 2)
                if s_block_start("extension_data"):
                    s_string("0x\x00\x06\x00\x17\x00\x18\x00\x19")
                s_block_end("extension_data")
            s_block_end("extension_block")
            s_repeat("extensions", min_reps=0, max_reps=600, step=50)
        s_block_end("extensions")

    s_block_end("handshake_client_hello")

s_block_end("all_client_hello")

