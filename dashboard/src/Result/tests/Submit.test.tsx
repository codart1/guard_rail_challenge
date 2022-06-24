import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Status, Submit } from '..';

vi.mock('react-router-dom', () => ({ useNavigate: () => vi.fn() }));

describe('<Submit />', () => {
  it('should submit new result', async () => {
    window.fetch = vi.fn(() => Promise.resolve({ json: vi.fn() } as any));
    window.alert = vi.fn();

    render(<Submit />);

    expect(screen.getByRole('radio', { checked: true }).id).toBe(Status.QUEUED);

    await userEvent.type(screen.getByLabelText('Repository name'), 'Test repo');
    await userEvent.click(screen.getByLabelText(Status.IN_PROGRESS));
    expect(screen.getByRole('radio', { checked: true }).id).toBe(
      Status.IN_PROGRESS
    );
    await userEvent.type(
      screen.getByLabelText('Finding'),
      '{"findings": []}'.replace(/[{[]/g, '$&$&')
    );

    await userEvent.click(screen.getByText('Submit'));

    const body = JSON.stringify({
      repositoryName: 'Test repo',
      status: Status.IN_PROGRESS,
      finding: { findings: [] },
    });

    expect(window.fetch).toBeCalledWith('http://localhost:3001/result', {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });
});
