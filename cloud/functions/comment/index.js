const cloud = require('wx-server-sdk')
const fetch = require('node-fetch')

cloud.init()

const COMMENT_URL = 'https://api.comments.hk'

exports.main = async () => {
  let data = await fetch(COMMENT_URL)
  return data.json()
}
