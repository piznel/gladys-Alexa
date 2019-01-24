module.exports = function uninstall() {

  return gladys.param.delete({ name: "Alexa_devices" })
}