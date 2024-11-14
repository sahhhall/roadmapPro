import sharp from "sharp";

const resizeImg = async (buffer: string) => {
    try {
        return await sharp(buffer)
            .resize({ width: 160, height: 160, fit: 'contain' })
            .toBuffer();
    } catch (err) {
        console.log(err)
    }
}