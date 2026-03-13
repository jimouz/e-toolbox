export function getKeySignatureImage(root) {
    if (!root) return null;
    const normalized = root.replace("♯", "#").replace("♭", "b");
    return `/e-toolbox/assets/key_signatures/${normalized}.png`;
}
