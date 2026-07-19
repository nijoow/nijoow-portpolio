import { submitContact } from '@/features/contact/api/submitContact';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

vi.mock('@/features/contact/api/submitContact', () => ({
  submitContact: vi.fn(),
}));

const submitContactMock = vi.mocked(submitContact);

beforeEach(() => submitContactMock.mockReset());

describe('ContactForm', () => {
  it('빈 폼을 제출하면 각 필드의 오류를 연결해 보여준다', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: '문의 보내기' }));

    expect(
      await screen.findByText('이름은 최소 2글자 이상 입력해 주세요.'),
    ).toBeVisible();
    expect(screen.getByLabelText(/이름/)).toHaveAttribute(
      'aria-describedby',
      'name-error',
    );
    expect(submitContactMock).not.toHaveBeenCalled();
  });

  it('유효한 값을 정리해 전송하고 성공 메시지를 보여준다', async () => {
    const user = userEvent.setup();
    submitContactMock.mockResolvedValue('문의가 정상적으로 전송되었습니다.');
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/이름/), '  이우진  ');
    await user.type(screen.getByLabelText(/이메일/), 'woojin@example.com');
    await user.type(screen.getByLabelText(/제목/), '포트폴리오 협업 문의');
    await user.type(
      screen.getByLabelText(/내용/),
      '새로운 프로젝트에 관해 함께 이야기하고 싶습니다.',
    );
    await user.click(screen.getByRole('button', { name: '문의 보내기' }));

    expect(submitContactMock).toHaveBeenCalledWith({
      name: '이우진',
      email: 'woojin@example.com',
      subject: '포트폴리오 협업 문의',
      message: '새로운 프로젝트에 관해 함께 이야기하고 싶습니다.',
      website: '',
    });
    expect(
      await screen.findByText('문의가 정상적으로 전송되었습니다.'),
    ).toBeVisible();
  });
});
