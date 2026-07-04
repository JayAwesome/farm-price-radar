import React from 'react';
import { CROPS } from '@/lib/data';
import { getBestMarket, getPriceTrendStatus } from '@/lib/logic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, MapPin, FileText, Rss } from 'lucide-react';

const Dashboard = () => {
  const [selectedCropId, setSelectedCropId] = React.useState(CROPS[0].id);
  const selectedCrop = CROPS.find(c => c.id === selectedCropId) || CROPS[0];
  const recommendation = getBestMarket(selectedCrop);

  const highestPrice = Math.max(...selectedCrop.prices.map(p => p.price));
  const lowestPrice = Math.min(...selectedCrop.prices.map(p => p.price));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Market Dashboard</h2>
          <p className="text-muted-foreground">Market price intelligence (demo dataset).</p>
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedCropId} onValueChange={setSelectedCropId}>
            <SelectTrigger className="w-full bg-card">
              <SelectValue placeholder="Select a crop" />
            </SelectTrigger>
            <SelectContent>
              {CROPS.map(crop => (
                <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-primary-foreground/70">AI-Powered Recommendation</CardDescription>
              <Badge className="bg-background/20 text-foreground backdrop-blur-sm">{recommendation.confidence}</Badge>
            </div>
            <CardTitle className="text-3xl flex items-center gap-3">
              <MapPin className="h-7 w-7" /> {recommendation.action}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6 pt-4">
            <div className="flex-1 space-y-4">
              <p className="text-primary-foreground/90 leading-relaxed">{recommendation.reason}</p>
            </div>
            <div className="w-full md:w-56 space-y-3 text-sm">
              <div className="flex justify-between items-center bg-background/10 p-2 rounded-lg">
                <span className="font-semibold text-primary-foreground/70 flex items-center gap-2"><TrendingUp size={16}/> Trend</span>
                <span className={`font-bold capitalize ${recommendation.trend === 'rising' ? 'text-green-300' : recommendation.trend === 'falling' ? 'text-red-300' : ''}`}>{recommendation.trend}</span>
              </div>
              <div className="flex justify-between items-center bg-background/10 p-2 rounded-lg">
                <span className="font-semibold text-primary-foreground/70 flex items-center gap-2"><Rss size={16}/> Signal</span>
                <span className="font-bold capitalize">{recommendation.seasonalSignal}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-primary/10 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
             <FileText className="h-5 w-5 text-primary" /> Why This Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Smallholder farmers in Nigeria lose up to 40% of produce post-harvest due to poor market information. AgriSense AI helps reduce this waste by providing clear, actionable insights.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-lg border-none">
          <CardHeader>
            <CardTitle>City Price Comparison</CardTitle>
            <CardDescription>Price for 1 {selectedCrop.unit} of {selectedCrop.name} in major hubs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Price (NGN)</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCrop.prices.map((item) => (
                  <TableRow key={item.city}>
                    <TableCell className="font-medium">{item.city}</TableCell>
                    <TableCell className="text-right font-sans">\u20A6{item.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      {item.price === highestPrice ? (
                        <Badge className="bg-primary text-primary-foreground">Highest</Badge>
                      ) : item.price === lowestPrice ? (
                        <Badge variant="destructive">Lowest</Badge>
                      ) : (
                        <Badge variant="outline">Average</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-none bg-accent/50">
          <CardHeader className="pb-4">
            <CardTitle>Price Range</CardTitle>
            <CardDescription>The highest and lowest prices for {selectedCrop.name} this week.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div>
                    <p className="text-sm text-green-600">Highest Price</p>
                    <p className="text-2xl font-bold">\u20A6{recommendation.highestPrice.toLocaleString()}</p>
                    <p className="text-sm font-semibold text-green-700">in {recommendation.bestCity}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500"/>
             </div>
             <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                <div>
                    <p className="text-sm text-red-600">Lowest Price</p>
                    <p className="text-2xl font-bold">\u20A6{recommendation.lowestPrice.toLocaleString()}</p>
                    <p className="text-sm font-semibold text-red-700">in {recommendation.lowestCity}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500"/>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
