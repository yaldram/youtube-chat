import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { conform, useForm } from '@conform-to/react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { validateLoginForm } from './loginAction';
import { SubmissionResult } from '@/types';

export function LoginPage() {
  const lastSubmission = useActionData() as SubmissionResult;
  const navigation = useNavigation();

  const [form, { username, password }] = useForm({
    id: 'login-form',
    lastSubmission,
    shouldRevalidate: 'onInput',
    onValidate: validateLoginForm,
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-1/3">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your information below to login
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
              label="Username"
              {...conform.input(username, {
                ariaAttributes: true,
              })}
              id="username"
              type="text"
              placeholder="john"
              error={username.error}
              errorId={username.errorId}
            />

            <Input
              {...conform.input(password, {
                ariaAttributes: true,
              })}
              label="Password"
              id="password"
              type="password"
              error={password.error}
              errorId={password.errorId}
            />

            <Button
              disabled={
                navigation.state === 'submitting' ||
                navigation.state === 'loading'
              }
              type="submit"
              className="w-full"
            >
              Login
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
            Don't have an account ?
            <Link className="ml-1 text-primary" to="/register">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
