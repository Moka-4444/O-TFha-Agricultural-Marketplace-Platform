import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';

export default function FarmerMessagesPage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
            {/* Contacts List */}
            <Card className="w-full md:w-80 flex flex-col">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-8" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors ${i === 1 ? 'bg-muted/50' : ''}`}
                        >
                            <Avatar>
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-medium truncate">Supplier Name {i}</span>
                                    <span className="text-xs text-muted-foreground">12:30 PM</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">
                                    {i === 1 ? "Sure, I can deliver by Friday." : "Is the item still available?"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                            <AvatarFallback>S1</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-medium">Supplier Name 1</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-green-600 inline-block" />
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">Hello, do you have the organic fertilizer in stock?</p>
                            <span className="text-xs text-muted-foreground mt-1 block">10:00 AM</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">Yes, we have plenty in stock. How many bags do you need?</p>
                            <span className="text-xs text-primary-foreground/70 mt-1 block text-right">10:05 AM</span>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">I need about 50 bags for my wheat field.</p>
                            <span className="text-xs text-muted-foreground mt-1 block">10:15 AM</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">Sure, I can deliver by Friday. The total would be $850.</p>
                            <span className="text-xs text-primary-foreground/70 mt-1 block text-right">12:30 PM</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t">
                    <form className="flex gap-2">
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
