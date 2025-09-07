import lifeVilleLogo from '/lifeville-logo.svg'

import LoginForm from '../../components/login-form'
import AppVersion from '../../components/app-version'

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 relative">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary/20 text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <img src={lifeVilleLogo} alt="Lifeville Hospital HMS" />
            </div>
            Lifeville <span className="text-primary">HMS</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login-bg.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="absolute bottom-4 left-2">
        <AppVersion />
      </div>
    </div>
  )
}
