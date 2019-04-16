import styled, { css } from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';
import { Link } from '../../elements';
import React from 'react';

export interface ImageTileProps {
  /** Tile Url */
  url?: string;
  /** New Tab Url */
  blankUrl?: string;
  /** Image Url */
  imageUrl?: string;
  /** Image Clickable */
  clickable?: boolean;
  /** Image Uploaded */
  uploaded?: boolean;
  /** Image Highlighted */
  highlighted?: boolean;
  /** Image Specs */
  imageSpecs?: string;
  /** Image Name */
  imageName?: string;
}

export function ImageTile({ url, blankUrl, imageUrl, clickable, uploaded, highlighted, imageSpecs, imageName }: ImageTileProps) {
  return (
    <StyledImageTile url={url} clickable={clickable} uploaded={uploaded} highlighted={highlighted}>
      <StyledImageTileHd>
        <StyledImageLink href={blankUrl} target="_blank">Open in new window</StyledImageLink>
        <StyledImage src={imageUrl} />
      </StyledImageTileHd>
      <StyledImageTileFt>
        <StyledImageSpecs>{imageSpecs}</StyledImageSpecs>
        <StyledImageName>{imageName}</StyledImageName>
      </StyledImageTileFt>
    </StyledImageTile>
  );
}

const StyledImageLink = styled(Link)`
  transition: transform .2s ease;
  transform: translateY(100%);
  background: rgba(255,255,255,.8);
  line-height: normal;
  padding: ${spaces.small};
  margin: 0;
  position: absolute;
  bottom: 38px;
  right: 0;
  left: 0;
  text-align: center;
  z-index: 1;
`;

const clickableCss = css`
  cursor: pointer;

  &:hover {
    border-color: ${colors.brand.primary};
    box-shadow: 0 0 0 2px ${colors.brand.primary};
  }

  &:hover ${StyledImageLink} {
    transition: transform .2s ease;
    transform: translateY(0);
  }
`;

const highlightedCss = css`
  border-color: ${colors.brand.primary};
  box-shadow: 0 0 0 2px ${colors.brand.primary};
`;

const StyledImageTile = styled.div<ImageTileProps>`
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGklEQVQYlWN48ODBf3TMgA0MBYWDzDkUKQQA/Su1D0qvFnQAAAAASUVORK5CYII=') repeat;
  position: relative;
  width: 100%;
  height: 160px;
  margin-top: ${spaces.medium};
  border: 1px solid rgba(0,0,0,.3);
  z-index: 0;

  ${({ clickable }) => (clickable ? clickableCss : null)}
  ${({ highlighted }) => (highlighted ? highlightedCss : null)}
  ${({ uploaded }) => (uploaded ? 'animation: .5s ease flash;' : null)}
`;

const StyledImageTileHd = styled.div`
  height: 120px;
  line-height: 88px;
  padding: ${spaces.medium};
  text-align: center;
  text-align: center;
`;

const StyledImageTileFt = styled.div`
  position: relative;
  z-index: 2;
  height: 38px;
  line-height: 38px;
  background: ${colors.tints.white};
  padding: 0 ${spaces.medium};
  font-size: ${fonts.Sizes.small};
  clear: right;
`;

const StyledImage = styled.img`
  display: inline-block;
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
`;

const StyledImageName = styled.div`
  width: 48%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledImageSpecs = styled.div`
  color: ${colors.gray.darkest};
  margin-left: ${spaces.xsmall};
  text-align: right;
  float: right;
  width: 48%;
`;