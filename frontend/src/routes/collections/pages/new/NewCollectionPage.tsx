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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { validateCollectionForm } from './newCollectionAction';

export function NewCollectionPage() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const lastSubmission = useActionData() as SubmissionResult;

  const [form, { title }] = useForm({
    id: 'collection-form',
    lastSubmission,
    shouldRevalidate: 'onInput',
    onValidate: validateCollectionForm,
  });

  const handleDialogOpen = (open: boolean) => {
    if (open) return;
    return navigate('..');
  };

  return (
    <Dialog defaultOpen onOpenChange={handleDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription>
            Add a new collection. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form method="POST" className="flex flex-col gap-5" {...form.props}>
          <Input
            label="Title"
            id="title"
            placeholder="Indian History"
            {...conform.input(title, {
              ariaAttributes: true,
            })}
            error={title.error}
            errorId={title.errorId}
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
