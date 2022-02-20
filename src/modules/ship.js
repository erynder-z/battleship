const shipFactory = (id, length, coordinates) => ({
  id,
  length,
  coordinates,
  hitbox: [],
  hit(position) {
    if (this.coordinates.includes(position)) {
      this.hitbox.push(position);
    }
  },
  isSunk() {
    return !!(
      this.hitbox.length >= 0 && this.hitbox.length === this.coordinates.length
    );
  },
});

module.exports = shipFactory;
