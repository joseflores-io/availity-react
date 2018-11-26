import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import UploadProgressBar from './UploadProgressBar';

const fileTypeIconMap = {
  png: 'file-image',
  jpg: 'file-image',
  jpeg: 'file-image',
  gif: 'file-image',
  ppt: 'file-powerpoint',
  pptx: 'file-powerpoint',
  xls: 'file-excel',
  xlsx: 'file-excel',
  doc: 'file-word',
  docx: 'file-word',
  txt: 'doc-alt',
  text: 'doc-alt',
  zip: 'file-archive',
  '7zip': 'file-archive',
  xml: 'file-code',
  html: 'file-code',
  pdf: 'file-pdf',
};

class FileRow extends Component {
  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    children: PropTypes.func,
    file: PropTypes.shape({
      id: PropTypes.string.isRequired,
      file: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  };

  remove = () => {
    this.props.onRemove(this.props.file.id);
  };

  progressBar = () => <UploadProgressBar upload={this.props.file} />;

  render() {
    const { file, children } = this.props;
    const ext = file.file.name
      .split('.')
      .pop()
      .toUpperCase();
    const icon = fileTypeIconMap[ext.toLowerCase()] || 'doc';

    if (typeof children === 'function') {
      return children({
        file,
        metadata: file.options.metadata,
        name: file.file.name,
        remove: this.remove,
        ext,
        icon,
        progressBar: this.progressBar,
      });
    }

    return (
      <tr>
        <td className="align-middle" style={{ width: '10%' }}>
          <i className={`icon icon-${icon}`} title={`${ext} File Icon`}>
            <span className="sr-only">{ext} File Icon</span>
          </i>{' '}
        </td>
        <td className="align-middle" style={{ width: '35%' }}>
          <div className="text-truncate" title={file.file.name}>
            {file.file.name}
          </div>
        </td>
        <td className="align-middle" style={{ width: '45%' }}>
          <UploadProgressBar upload={file} />
        </td>
        <td className="align-middle" style={{ width: '10%' }}>
          <Button
            color="link"
            className="text-danger px-0"
            onClick={this.remove}
          >
            <i className="icon icon-trash-empty">
              <span className="sr-only">
                Remove
                {file.file.name}
              </span>
            </i>
          </Button>
        </td>
      </tr>
    );
  }
}

export default FileRow;
