import React from 'react';
import { toast } from 'react-toastify';
import { Toaster } from '@util-components';

export const errorToaster = (content: String, title: String = null, link: Object) =>
  toast(<Toaster {...{ content, title, type: 'error', link }} />, {
    autoClose: false,
    className: 'solid-toaster toaster-error',
    type: 'error'
  });

export const successToaster = (content: String, title: String = null, link: Object) =>
  toast(<Toaster {...{ content, title, type: 'success', link }} />, {
    className: 'solid-toaster toaster-success',
    type: 'success'
  });
