export default function xFrameOptions (value = 'Deny') {
  return (req, res, next) => {
    res.setHeader('X-Frame-Options', value)
    next()
  }
}
