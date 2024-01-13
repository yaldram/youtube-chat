import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { useForm, conform } from '@conform-to/react';

import { SubmissionResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { validateRegisterForm } from './registerAction';

export function RegisterPage() {
  const lastSubmission = useActionData() as SubmissionResult;
  const navigation = useNavigation();

  const [form, { name, username, password }] = useForm({
    id: 'register-form',
    lastSubmission,
    shouldRevalidate: 'onInput',
    onValidate: validateRegisterForm,
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-1/3">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>

        <Form method="POST" {...form.props}>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <Input
              {...conform.input(name, { ariaAttributes: true })}
              label="Full Name"
              errorId={name.errorId}
              error={name.error}
              id="name"
              type="text"
              placeholder="John Doe"
              required
            />

            <Input
              {...conform.input(username, { ariaAttributes: true })}
              label="Username"
              errorId={username.errorId}
              error={username.error}
              id="username"
              type="text"
              placeholder="john"
            />

            <Input
              {...conform.input(password, { ariaAttributes: true })}
              label="Password"
              errorId={password.errorId}
              error={password.error}
              id="password"
              type="password"
            />

            <Button
              disabled={
                navigation.state === 'submitting' ||
                navigation.state === 'loading'
              }
              type="submit"
              className="w-full"
            >
              Create account
            </Button>
          </CardContent>
        </Form>

        <CardFooter className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account ?{' '}
            <Link className="ml-1 text-primary" to="/login">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
