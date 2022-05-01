{
"rules": {
"rooms": {
".read" : false,
".write": "auth != null",
"$roomId": {
".read" : true,
".write": "auth != null && (!data.exists() || data.child('auth.Id').val() == auth.id)",
"questions": {
".read" : false,
".write": "auth != null && (!data.exists() || data.parent().child('auth.Id').val() == auth.id)",
"likes":{
".read" : true,
".write": "auth != null && (!data.exists() || data.child('auth.Id').val() == auth.id)",
}
}
}
}
}
}
