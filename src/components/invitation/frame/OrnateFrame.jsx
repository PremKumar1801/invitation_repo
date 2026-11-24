import { useId } from 'react';
import { motion } from 'framer-motion';
import { GoldDefs, Corner, LotusCrest } from './FrameOrnaments';

/**
 * variant="portrait" -> matching frames for bride / groom
 * variant="couple"   -> grander frame: double outer ring, lotus crests, soft glow
 *
 * Always pass the real width/height of the image file. The browser then
 * reserves the exact space before the image loads (no layout shift) and the
 * photo is never cropped or stretched.
 *
 * frameVariants / imageVariants are Framer Motion variants with
 * "hidden" and "show" states, supplied by the parent so reveals can be staggered.
 */
export default function OrnateFrame({
  variant = 'portrait',
  src,
  alt,
  width,
  height,
  caption,
  loading = 'eager',
  frameVariants,
  imageVariants,
}) {
  const gid = `rw-gold-${useId().replace(/:/g, '')}`;
  const grand = variant === 'couple';

  return (
    <motion.figure className={`rw-frame rw-frame--${variant}`} variants={frameVariants}>
      <GoldDefs id={gid} />

      <div className="rw-frame__plate">
        <div className="rw-frame__panel">
          <div className="rw-frame__mat">
            <motion.div className="rw-frame__reveal" variants={imageVariants}>
              <img
                className="rw-frame__img"
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                decoding="async"
                draggable={false}
              />
            </motion.div>
          </div>

          <Corner gid={gid} className="rw-corner rw-corner--tl" />
          <Corner gid={gid} className="rw-corner rw-corner--tr" />
          <Corner gid={gid} className="rw-corner rw-corner--bl" />
          <Corner gid={gid} className="rw-corner rw-corner--br" />

          {grand && (
            <>
              <LotusCrest gid={gid} className="rw-crest rw-crest--top" />
              <LotusCrest gid={gid} className="rw-crest rw-crest--bottom" />
            </>
          )}
        </div>
      </div>

      {caption ? <figcaption className="rw-frame__caption">{caption}</figcaption> : null}
    </motion.figure>
  );
}
