import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames/bind';
import { isFunction } from 'lodash';

import { Button } from '@folio/stripes/components';

import css from './FileUploader.css';

const cx = classNames.bind(css);

export const FileUploader = ({
  title,
  uploadButtonText,
  accept,
  isDropZoneActive,
  maxSize,
  multiple = true,
  children,
  inputProps = { id: 'file-uploader-field' },
  onDrop,
  onDragEnter,
  onDragLeave,
  disabled,
}) => {
  const {
    getRootProps, getInputProps, open, isDragActive,
  } = useDropzone({
    noClick: true,
    disabled,
    accept,
    multiple,
    maxSize,
    onDrop,
    onDragEnter,
    onDragLeave,
  });

  const updateClassName = cx({
    upload: true,
    activeUpload: isDragActive,
  });

  const titleClassName = cx({
    uploadTitle: true,
    activeUploadTitle: isDropZoneActive,
  });

  return (
    <div
      data-test-file-uploader
      aria-disabled={disabled}
      {...getRootProps({ role: 'presentation' })}
      className={updateClassName}
      data-testid="fileUploader-input"
    >
      <input
        {...getInputProps()}
      />
      <span
        className={titleClassName}
        data-test-title
      >
        {title}
      </span>
      <div
        data-test-secondary-area
        hidden={isDropZoneActive}
      >
        <label htmlFor={inputProps.id}>
          <Button
            data-test-upload-btn
            marginBottom0
            buttonStyle="primary"
            autoFocus
            disabled={disabled}
            onClick={open}
          >
            {uploadButtonText}
          </Button>
        </label>
      </div>
      <div hidden={isDropZoneActive}>
        {isFunction(children) ? children(open) : children}
      </div>
    </div>
  );
};

FileUploader.propTypes = {
  title: PropTypes.node.isRequired,
  uploadButtonText: PropTypes.node.isRequired,
  isDropZoneActive: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  inputProps: PropTypes.shape({ id: PropTypes.string.isRequired }),
};

