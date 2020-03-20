export default class Circle {
  _x = 0
  _y = 0
  _radius = 30
  _dx = 1
  _dy = 1

  constructor(x, y, radius, dx, dy) {
    this._x = x
    this._y = y
    this._radius = radius
    this._dx = dx
    this._dy = dy
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false)
    ctx.strokeStyle = 'blue'
    ctx.stroke()
  }

  update(ctx, { width, height }) {
    if (this._x + this._radius > width || this._x - this._radius < 0) {
      this._dx = -this._dx
    }
    if (this._y + this._radius > height || this._y - this._radius < 0) {
      this._dy = -this._dy
    }
    this._x += this._dx
    this._y += this._dy

    this.draw(ctx)
  }
}
