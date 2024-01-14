import { conform, useForm } from '@conform-to/react';
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import { SubmissionResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateVideoForm } from './newVideoAction';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function NewVideoPage() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const lastSubmission = useActionData() as SubmissionResult;

  const [form, { url }] = useForm({
    id: 'video-form',
    lastSubmission,
    shouldRevalidate: 'onInput',
    onValidate: validateVideoForm,
  });

  const handleDialogOpen = (open: boolean) => {
    if (open) return;
    return navigate('..');
  };

  return (
    <Dialog defaultOpen onOpenChange={handleDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Video</DialogTitle>
          <DialogDescription>
            Add a new video to this collection. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form method="POST" className="flex flex-col gap-5" {...form.props}>
          <Input
            label="Video url"
            id="url"
            {...conform.input(url, {
              ariaAttributes: true,
            })}
            error={url.error}
            errorId={url.errorId}
          />

          <Button
            disabled={
              navigation.state === 'submitting' ||
              navigation.state === 'loading'
            }
            type="submit"
            className="w-full"
          >
            Save
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
