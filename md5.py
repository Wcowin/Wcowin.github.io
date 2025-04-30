import hashlib

data = "189xxxxxxxx"
md5_hash = hashlib.md5(data.encode()).hexdigest()
print(md5_hash)