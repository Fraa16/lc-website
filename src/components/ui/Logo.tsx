import type { CSSProperties } from 'react';
import logoUrl from '../../images/lc-logo-lang.webp';
import { cx } from '../../lib/cx';

const mask = `url(${logoUrl}) left center / contain no-repeat`;

/**
 * Horizontal wordmark. The webp is used as a CSS mask so it can be tinted
 * via `text-*` (navy on cream, cream on navy).
 */
export function Logo({ className }: { className?: string }) {
  const style: CSSProperties = {
    backgroundColor: 'currentColor',
    WebkitMask: mask,
    mask,
  };
  return <span aria-hidden="true" className={cx('block flex-none', className)} style={style} />;
}
