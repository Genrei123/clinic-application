import type { Meta, StoryObj } from '@storybook/react';

import ErrorModal from './ErrorModal';

const meta = {
  component: ErrorModal,
} satisfies Meta<typeof ErrorModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {}
  }
};