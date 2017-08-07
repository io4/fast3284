# fast3284
F@ST 3284 (Residential Gateway) backup analysis
## Backup
### Encoding
The backup file downloaded from the gateway ( https://gateway/GatewaySettings.bin ), is encoded using XOR.
A quick analysis made obvious the "password" was 0x80
### Format
The backup itself has some obvious segments, where data is separated by nulls and have a byte indicating length.
### Information
The backup contains:
* Plaintext passwords for all users
* Plaintext passwords for wifi
* Time servers used
* DHCP alocations (IP - MAC - Hostname)
* Model name (FAST3284)
## Information I found
* Password is 0x80
* All sensitive data is in plaintext
* There is a special user called "expert" which can modify more parameters, not available to admin. This includes VPN settings, enable IPv6, more detail on SIP algorithms, Media handle, being able to modify Radio parameters
* Broadcom is probably the radio chipset manufacturer, as the string "Broadcom" appears many times in backup
