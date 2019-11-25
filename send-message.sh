read -r -p "Contact: " contact
read -r -p "Message: " message

contact='"'${contact}'"'
message='"'${message}'"'

execute_string="tell application \"Messages\" to send ${message} to buddy ${contact}"

osascript -e "$execute_string"