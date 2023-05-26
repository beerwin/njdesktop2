export const doesOverlap = (r1, r2) => {
    if (r1.right < r2.left || r2.right < r1.left) {
        return false;
    }

    if (r1.bottom < r2.top || r2.bottom < r1.top) {
        return false;
    }

    return true;
}