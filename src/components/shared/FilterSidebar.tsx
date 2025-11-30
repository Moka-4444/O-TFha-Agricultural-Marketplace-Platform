import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function FilterSidebar() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground h-auto p-0 hover:text-primary">
                    Clear All
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={["category", "price", "filters"]} className="w-full">
                {/* Category Filter */}
                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {['All Categories', 'Seeds', 'Fertilizers', 'Equipment', 'Services', 'Produce'].map((cat) => (
                                <div key={cat} className="flex items-center space-x-2">
                                    <Checkbox id={`cat-${cat}`} />
                                    <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer">
                                        {cat}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            <Slider defaultValue={[0, 1000]} max={1000} step={10} />
                            <div className="flex items-center gap-2">
                                <Input type="number" placeholder="Min" className="h-8" />
                                <span className="text-muted-foreground">-</span>
                                <Input type="number" placeholder="Max" className="h-8" />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Other Filters */}
                <AccordionItem value="filters">
                    <AccordionTrigger>More Filters</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="organic" />
                                <Label htmlFor="organic" className="font-normal">Organic Only</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="verified" />
                                <Label htmlFor="verified" className="font-normal">Verified Suppliers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="instock" />
                                <Label htmlFor="instock" className="font-normal">In Stock</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="shipping" />
                                <Label htmlFor="shipping" className="font-normal">Free Shipping</Label>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button className="w-full">Apply Filters</Button>
        </div>
    );
}
