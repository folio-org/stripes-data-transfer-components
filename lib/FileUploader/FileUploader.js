import React from 'react';
import PropTypes from 'prop-types';
import ReactDropzone from 'react-dropzone';
import classNames from 'classnames/bind';
import { isFunction } from 'lodash';

import { Button } from '@folio/stripes/components';

import defaultStyles from './defaultStyles.css';
import css from './FileUploader.css';

const cx = classNames.bind(css);

export const FileUploader = ({
  title,
  uploadButtonText,
  accept,
  isDropZoneActive,
  className = defaultStyles.defaultFileUploader,
  acceptClassName,
  activeClassName,
  rejectClassName,
  disabledClassName,
  maxSize,
  multiple,
  children,
  style,
  getDataTransferItems,
  onDrop,
  onDragEnter,
  onDragLeave,
}) => {
  const titleClassName = cx({
    uploadTitle: true,
    activeUploadTitle: isDropZoneActive,
  });

  return (
    <ReactDropzone
      disableClick
      className={className}
      style={style}
      activeClassName={activeClassName}
      accept={accept}
      acceptClassName={acceptClassName}
      rejectClassName={rejectClassName}
      disabledClassName={disabledClassName}
      multiple={multiple}
      maxSize={maxSize}
      getDataTransferItems={getDataTransferItems}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {({ open }) => (
        <>
          <span
            className={titleClassName}
            data-test-title
          >
            {title}
          </span>
          <div hidden={isDropZoneActive}>
            <Button
              marginBottom0
              buttonStyle="primary"
              onClick={open}
            >
              {uploadButtonText}
            </Button>
          </div>
          <div hidden={isDropZoneActive}>
            {isFunction(children) ? children(open) : children}
          </div>
        </>
      )}
    </ReactDropzone>
  );
};

FileUploader.propTypes = {
  title: PropTypes.node.isRequired,
  uploadButtonText: PropTypes.node.isRequired,
  isDropZoneActive: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  className: PropTypes.string,
  acceptClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  rejectClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  style: PropTypes.object,
  getDataTransferItems: PropTypes.func,
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

FileUploader.defaultProps = { multiple: true };
