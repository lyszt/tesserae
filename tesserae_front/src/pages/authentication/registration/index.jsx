import { createSignal } from 'solid-js'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CatIcon } from '@/components/ui/icons/cat-icon'
import { HomeOutlinedIcon } from "@/components/ui/icons/ant-design-home-outlined";

import { sendRegisterData } from './utils'

export default function RegisterScreen({showRegister, setShowRegister, setAuth, setLoginScreen}) {

	const [username, setUsername] = createSignal('')
	const [password, setPassword] = createSignal('')
	const [email, setEmail] = createSignal('')
	const [fullname, setFullname] = createSignal('')
	const [errorMessage, setErrorMessage] = createSignal('')

	async function handleSubmit(e) {
		e.preventDefault()
		setErrorMessage('')
		const res = await sendRegisterData(username(), password(), email())
		if (!res?.success) {
			setErrorMessage(res?.message)
			return res
		}
		if (res?.success) {
			setAuth(true);
            setLoginScreen(false);
		}
		return res
	}


	function closeRegisterScreen() {
		setShowRegister(false)
	}


	return (
		<Card className="w-[90%] max-w-5xl border-border/50 shadow-2xl overflow-hidden">
			<div className="flex flex-col md:flex-row min-h-[600px]">
				{/* Left Panel - Marketing */}
				<div className="w-full md:w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 text-white p-10 flex flex-col justify-center gap-6">
					<div className="space-y-4">
						<div className="flex flex-col items-center gap-3">
							<CatIcon size={32} className="text-slate-300" />
							<h2 className="text-3xl font-bold tracking-tight">Join your community</h2>
						</div>
						<p className="text-slate-300 leading-relaxed">
							Become part of our tech media community. Read expert analysis and breaking news,
							or share your own perspective by publishing articles, posts, and stories.
							Your voice matters here.
						</p>
					</div>
					<div className="flex items-center gap-3 text-slate-400 text-sm">
						<div className="h-px flex-1 bg-slate-700"></div>
						<span>Free to Join</span>
						<div className="h-px flex-1 bg-slate-700"></div>
					</div>
					<Button className="w-1/3 ml-auto mr-auto invert saturate-0" onClick={() => {setLoginScreen(false)}}>Return instead<HomeOutlinedIcon/></Button> 
				</div>

				{/* Right Panel - Registration Form */}
				<div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<CardHeader className="px-0 pb-8">
							<CardTitle className="text-2xl">Start your free membership</CardTitle>
							<CardDescription>Join thousands of tech enthusiasts and industry professionals</CardDescription>
						</CardHeader>

						<CardContent className="px-0 space-y-4">
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									type="text"
									placeholder="Choose a username"
									value={username()}
									onInput={(e) => { setUsername(e.target.value); setErrorMessage('') }}
									className="h-10"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="fullname">Full name</Label>
								<Input
									id="fullname"
									type="fullname"
									placeholder="Enter your full name"
									value={fullname()}
									onInput={(e) => { setFullname(e.target.value); setErrorMessage('') }}
									className="h-10"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email address"
									value={email()}
									onInput={(e) => { setEmail(e.target.value); setErrorMessage('') }}
									className="h-10"
								/>
							</div>
							

							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Create a secure password"
									value={password()}
									onInput={(e) => { setPassword(e.target.value); setErrorMessage('') }}
									className="h-10"
								/>
							</div>

							{errorMessage() && (
								<div className="text-sm text-destructive font-medium bg-destructive/10 border border-destructive/20 rounded-md p-3">
									{errorMessage()}
								</div>
							)}

							<div className="flex flex-col gap-3 pt-2">
								<Button
									type="submit"
									size="lg"
									className="w-full bg-slate-900 hover:bg-slate-800 text-white"
								>
									Create Account
								</Button>

								<Button
									type="button"
									variant="outline"
									size="lg"
									className="w-full"
									onClick={closeRegisterScreen}
								>
									Back to Login
								</Button>
							</div>
						</CardContent>
					</form>
				</div>
			</div>
		</Card>
	)
}
